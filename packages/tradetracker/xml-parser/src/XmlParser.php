<?php
namespace TradeTracker;

use Symfony\Component\DomCrawler\Crawler;
use TradeTracker\Contracts\XmlParserContract;
use TradeTracker\Exceptions\TradeTrackerXmlParserException;

class XmlParser implements XmlParserContract
{
    protected $XMLReader, $uri, $path, $stop, $encoding, $pathListeners = array(), $ignoreCase = false;

    /**
     * XmlParser constructor.
     *
     * @param bool   $ignoreCase
     * @param string $encoding
     */
    public function __construct($ignoreCase = true, $encoding = 'UTF-8')
    {
        $this->XMLReader = new \XMLReader;
        $this->ignoreCase = $ignoreCase;
        $this->encoding = $encoding;
    }


    /**
     * Binds XML Path to a listner
     *
     * @param $path
     * @param $listener
     *
     * @return $this
     * @throws \TradeTracker\Exceptions\TradeTrackerXmlParserException
     */
    public function bind($path, $listener)
    {
        if ( ! is_callable($listener)) {
            throw new \InvalidArgumentException('Listner is not a valid callable');
        }
        $path = $this->convertCase($path);
        if (isset($this->pathListeners[ $path ])) {
            throw new TradeTrackerXmlParserException('Another listner already binding this path ' . $path);
        }
        $this->pathListeners[ $path ] = $listener;

        return $this;
    }

    protected function convertCase($s)
    {
        return $this->ignoreCase ? mb_strtolower($s) : $s;
    }

    public function getPathListners()
    {
        return $this->pathListeners;
    }

    /**
     * Unbind Path (It will not be processed unless it's already bring proccessed)
     *
     * @param $path
     *
     * @return $this
     */
    public function unbind($path)
    {
        $path = $this->convertCase($path);
        if (isset($this->pathListeners[ $path ])) {
            unset($this->pathListeners[ $path ]);
        }

        return $this;
    }

    public function unbindAll()
    {
        $this->pathListeners = array();

        return $this;
    }

    /**
     * Stops the current read proccess
     *
     * @return $this
     */
    public function stop()
    {
        $this->stop = true;

        return $this;
    }

    /**
     * @param string $uri URL to the XML Feed file
     * @param int    $options
     *
     * @return $this
     * @throws \TradeTracker\Exceptions\TradeTrackerXmlParserException
     */
    public function process($uri, $options = 0)
    {
        $this->path = array();
        try {

            if ( ! $this->XMLReader->open($uri, null,
                $options | LIBXML_NOERROR | LIBXML_NOWARNING | LIBXML_PARSEHUGE)
            ) {
                // Unable to open due to invalid document type
                throw new TradeTrackerXmlParserException('Invalid Document' . $uri);
            }
        } catch (\ErrorException $e) {
            // Unable to read from the specified URI
            throw new TradeTrackerXmlParserException('Unable to open URI:' . $uri);
        }
        $this->stop = false;
        while ( ! $this->stop && $this->XMLReader->read()) {
            switch ($this->XMLReader->nodeType) {
                // Once an element detected we should check if it has a registered listner
                case \XMLReader::ELEMENT:
                    array_push($this->path, $this->convertCase($this->XMLReader->name));
                    $path = $this->getCurrentPath();

                    // Notify listner for processing
                    $this->notifyListener($path);
                    if ( ! $this->XMLReader->isEmptyElement) {
                        break;
                    }
                case \XMLReader::END_ELEMENT:
                    array_pop($this->path);
                    break;
            }
        }
        $this->XMLReader->close();

        return $this;
    }

    /**
     * Returns current santized path
     * @return string
     */
    protected function getCurrentPath()
    {
        return '/' . join('/', $this->path);
    }

    /**
     * @param string $path valid listner path
     *
     * @return $this
     */
    protected function notifyListener($path)
    {
        if (isset($this->pathListeners[ $path ])) {
            $node = new Crawler;

            // Assign current path nod to Symfony crawler object for futher processing
            $node->addXmlContent($this->XMLReader->readOuterXML(), $this->encoding);
            $this->pathListeners[ $path ]($node, $this);
        }

        return $this;
    }

}