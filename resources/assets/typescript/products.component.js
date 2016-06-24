"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var ProductsComponent = (function () {
    function ProductsComponent() {
        this.products = [];
        this.pusher = new Pusher('1d1099dc442b77d30bfc', { cluster: "eu" });
        this.channel = this.pusher.subscribe('feed-reader');
        this.channel.bind('new-feed', function (data) {
            data.forEach(function (product) {
                this.products.push(product);
            }.bind(this));
        }.bind(this));
    }
    ProductsComponent = __decorate([
        core_1.Component({
            selector: 'products-list',
            template: '<li class="product" *ngFor="let product of products"> <h2>Content: {{ product.name }}</h2> </li>'
        })
    ], ProductsComponent);
    return ProductsComponent;
}());
exports.ProductsComponent = ProductsComponent;
//# sourceMappingURL=products.component.js.map