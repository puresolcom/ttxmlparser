<?php

namespace App\Http\Controllers;


use Symfony\Component\DomCrawler\Crawler;
use TradeTracker\Exceptions\TradeTrackerXmlParserException;
use TradeTracker\XmlParser;
use Vinkla\Pusher\PusherManager;

class HomeController extends Controller
{
    const MAX_COUNT = 1000;

    protected $xmlPraser;
    protected $pusher;
    protected $products;
    protected $counted = 0;

    public function __construct(XmlParser $xmlParser, PusherManager $pusher)
    {
        $this->xmlPraser = $xmlParser;
        $this->pusher = $pusher;
        //        header('X-Accel-Buffering: no');
    }

    public function anyGetXml()
    {


        $this->products = [];

        $response = [];
        if ( ! \Request::has('url') || ! \Request::has('event')) {
            $response[ 'ERROR' ] = 'Invalid Params';
        } else {
            try {
                $this->xmlPraser->bind('/products/product',
                    function (Crawler $product, $parserInstance) use ($response) {
                        $this->counted++;

                        $categories = [];
                        foreach ($product->filter('categories')->children() as $category) {
                            $categories[] = $category->textContent;
                        }
                        $this->products[] = array(
                            'productID'   => $product->filter('productID')->text(),
                            'name'        => $product->filter('name')->text(),
                            'description' => $product->filter('description')->text(),
                            'price'       => $product->filter('price')->text(),
                            'currency'    => $product->filter('price')->attr('currency'),
                            'productURL'  => $product->filter('productURL')->text(),
                            'imageURL'    => $product->filter('imageURL')->text(),
                            'categories'  => $categories,
                        );


                        if ($this->counted >= SELF::MAX_COUNT) {
                            $parserInstance->stop();
                        }
                        if (count($this->products) % 10 == 0) {
                            $this->pusher->trigger('feed-reader', 'new-feed-' . trim(\Request::get('event')),
                                $this->products);
                            $this->products = [];
                        }
                    })->process(trim(\Request::get('url')));
                $response[ 'MESSAGE' ] = 'DONE';
            } catch (TradeTrackerXmlParserException $e) {
                $response[ 'ERROR' ] = $e->getMessage();
            }
        }

        return \Response::json($response);
    }

    public function getAngular()
    {
        return view('angular.index');
    }

    private function _humanReadableSize($size)
    {
        $unit = array('b', 'kb', 'mb', 'gb', 'tb', 'pb');

        return @round($size / pow(1024, ($i = floor(log($size, 1024)))), 2) . ' ' . $unit[ $i ];
    }
}