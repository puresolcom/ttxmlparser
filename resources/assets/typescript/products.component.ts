import random = require("core-js/fn/number/random");
declare var Pusher:any;
import {Component} from "@angular/core";
import {HTTP_PROVIDERS, Http, Headers} from "@angular/http";
import "rxjs/Rx";
@Component({
    selector: 'products-list',
    template: `
<ul>
    <li class="product" *ngFor="let product of products">
    <div class="panel panel-default product-panel">
  <div class="panel-heading">{{ product.name }} - <em>#ID: {{product.productID}}</em></div>
  <div class="panel-body">
    {{ product.description }}
    
    <h5>More data</h5>
    <ul>
        <li><b>Price</b> : {{ product.price }} {{ product.currency }}</li>
        <li><b>Product URL</b> : {{ product.productURL }}</li>
        <li><b>Image URL</b> : {{ product.imageURL }}</li>
        <li><b>Categories:</b> 
            <ul>
                <li *ngFor="let category of product.categories">{{ category }}</li>        
            </ul>
        </li>
    </ul>
  </div>
</div>
     </li>
</ul>`,
    providers: [HTTP_PROVIDERS]
})
export class ProductsComponent {

    pusher:any;
    channel:any;
    products:any;
    identifier:any;
    totalProcessed:number;

    constructor(public http:Http) {
        this.products = [];
        this.pusher = new Pusher('1d1099dc442b77d30bfc', {cluster: "eu"});
    }

    listener() {
        this.identifier = Math.floor(Math.random() * (9999 - 1111 + 1)) + 1111;
        this.channel = this.pusher.subscribe('feed-reader');
        this.channel.bind('new-feed-' + this.identifier, function (data) {
            data.forEach(function (product) {
                this.totalProcessed++;
                this.products.push(product);
                if (this.products.length >= 5) {
                    this.products.shift();
                }
            }.bind(this));
        }.bind(this));
    }

    processXML(url) {
        this.products = [];
        this.totalProcessed = 0;
        this.listener();
        var body = "url=" + encodeURIComponent(url) + "&event=" + this.identifier;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        this.http.post('xml', body, {
            headers: headers
        }).map(response => response.json())
            .subscribe(
                response => this.handleResponse(response)
            );
    }

    handleResponse(res) {
        if (res.hasOwnProperty('ERROR')) {
            alert(res.ERROR);
        } else if (res.hasOwnProperty('MESSAGE')) {
            alert(res.MESSAGE);
        }
    }

}