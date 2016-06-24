System.register(["@angular/core", "@angular/http", "rxjs/Rx"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1;
    var ProductsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            ProductsComponent = (function () {
                function ProductsComponent(http) {
                    this.http = http;
                    this.products = [];
                    this.pusher = new Pusher('1d1099dc442b77d30bfc', { cluster: "eu" });
                }
                ProductsComponent.prototype.listener = function () {
                    this.identifier = Math.floor(Math.random() * (9999 - 1111 + 1)) + 1111;
                    this.channel = this.pusher.subscribe('feed-reader');
                    this.channel.bind('new-feed-' + this.identifier, function (data) {
                        data.forEach(function (product) {
                            this.totalProcessed++;
                            this.products.push(product);
                            if (this.products.length > 10) {
                                this.products.shift();
                            }
                        }.bind(this));
                    }.bind(this));
                };
                ProductsComponent.prototype.processXML = function (url) {
                    var _this = this;
                    this.products = [];
                    this.totalProcessed = 0;
                    this.listener();
                    var body = "url=" + encodeURIComponent(url) + "&event=" + this.identifier;
                    var headers = new http_1.Headers();
                    headers.append('Content-Type', 'application/x-www-form-urlencoded');
                    this.http.post('xml', body, {
                        headers: headers
                    }).map(function (response) { return response.json(); })
                        .subscribe(function (response) { return _this.handleResponse(response); });
                };
                ProductsComponent.prototype.handleResponse = function (res) {
                    if (res.hasOwnProperty('ERROR')) {
                        alert(res.ERROR);
                    }
                    else if (res.hasOwnProperty('MESSAGE')) {
                        alert(res.MESSAGE);
                    }
                };
                ProductsComponent = __decorate([
                    core_1.Component({
                        selector: 'products-list',
                        template: "\n<ul>\n    <li class=\"product\" *ngFor=\"let product of products\">\n    <div class=\"panel panel-default product-panel\">\n  <div class=\"panel-heading\">{{ product.name }} - <em>#ID: {{product.productID}}</em></div>\n  <div class=\"panel-body\">\n    {{ product.description }}\n    \n    <h5>More data</h5>\n    <ul>\n        <li><b>Price</b> : {{ product.price }} {{ product.currency }}</li>\n        <li><b>Product URL</b> : {{ product.productURL }}</li>\n        <li><b>Image URL</b> : {{ product.imageURL }}</li>\n        <li><b>Categories:</b> \n            <ul>\n                <li *ngFor=\"let category of product.categories\">{{ category }}</li>        \n            </ul>\n        </li>\n    </ul>\n  </div>\n</div>\n     </li>\n</ul>",
                        providers: [http_1.HTTP_PROVIDERS]
                    }), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ProductsComponent);
                return ProductsComponent;
            }());
            exports_1("ProductsComponent", ProductsComponent);
        }
    }
});

//# sourceMappingURL=products.component.js.map
