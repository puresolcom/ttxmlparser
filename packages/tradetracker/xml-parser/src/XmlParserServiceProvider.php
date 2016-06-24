<?php

namespace TradeTracker;

use Illuminate\Support\ServiceProvider;
use TradeTracker\Contracts\XmlParserContract;

class XmlParserServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->registerXmlParser();
    }

    protected function registerXmlParser()
    {
        $this->app->singleton(XmlParserContract::class, function(){
            return new XmlParser();
        });
    }
}