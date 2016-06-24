<?php
namespace TradeTracker\Contracts;

interface XmlParserContract
{
    public function bind($path, $listener);

    public function process($uri, $options = 0);

    public function stop();

}