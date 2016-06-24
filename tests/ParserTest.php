<?php

use Symfony\Component\DomCrawler\Crawler;
use TradeTracker\Exceptions\TradeTrackerXmlParserException;
use TradeTracker\XmlParser;

class ParserTest extends TestCase
{

    public function testPathListnerBind()
    {
        $xmlParser = new XmlParser(false);
        $bindPath = '/products/product';
        $xmlParser->bind($bindPath, function () { });

        $this->assertArrayHasKey($bindPath, $xmlParser->getPathListners());
    }


    public function testSecondBindArgumentIsNotValidClosure()
    {
        $xmlParser = new XmlParser(false);
        $bindPath = '/products/product';
        $this->setExpectedException('invalidArgumentException');
        $xmlParser->bind($bindPath, 'invalidClosure');
        $this->getExpectedException();
    }

    public function testAvoidDuplicatePaths()
    {
        $xmlParser = new XmlParser(false);
        $bindPath = '/products/product';
        $this->setExpectedException(TradeTrackerXmlParserException::class);
        $xmlParser->bind($bindPath, function () { });
        $xmlParser->bind($bindPath, function () { });
        $this->getExpectedException();
    }

    public function testUnbindAllPaths()
    {
        $xmlParser = new XmlParser(false);
        $bindPath = '/products/product';
        $xmlParser->bind($bindPath, function () { });
        $xmlParser->unbindAll();
        $this->assertEmpty($xmlParser->getPathListners());
    }

    public function testPathListnerUnbind()
    {
        $xmlParser = new XmlParser(false);
        $bindPath = '/products/product';
        $xmlParser->bind($bindPath, function () { });
        $xmlParser->unbind($bindPath);
        $this->assertArrayNotHasKey($bindPath, $xmlParser->getPathListners());
    }

    public function testProcessCanReadValidURI()
    {
        $xmlParser = new XmlParser(false);
        $bindPath = '/products/product';

        $result = $xmlParser->bind($bindPath, function (Crawler $product) {
        })
                            ->process('http://pf.tradetracker.net/?aid=1&type=xml&encoding=utf-8&fid=251713&categoryType=2&additionalType=2&limit=1');

        $this->assertInstanceOf(XmlParser::class, $result);

    }

    public function testProcessCanDetectInvalidURI()
    {
        $xmlParser = new XmlParser(false);
        $bindPath = '/products/product';
        $this->setExpectedException(TradeTrackerXmlParserException::class);
        $xmlParser->bind($bindPath, function (Crawler $product) {
        })->process('test/demo.xml');
        $this->getExpectedException();
    }

    public function testValidXmlResponse()
    {
        $xmlParser = new XmlParser(false);
        $bindPath = '/products/product';

        $result = $xmlParser->bind($bindPath, function (Crawler $product) {
            $this->assertTrue($product->nodeName() === 'product');
        })
                            ->process('http://pf.tradetracker.net/?aid=1&type=xml&encoding=utf-8&fid=251713&categoryType=2&additionalType=2&limit=1');

        $this->assertInstanceOf(XmlParser::class, $result);
    }
}
