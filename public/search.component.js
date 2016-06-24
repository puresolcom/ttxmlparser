System.register(["@angular/core", "./products.component"], function(exports_1, context_1) {
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
    var core_1, products_component_1;
    var SearchComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (products_component_1_1) {
                products_component_1 = products_component_1_1;
            }],
        execute: function() {
            SearchComponent = (function () {
                function SearchComponent() {
                }
                SearchComponent.prototype.onSubmit = function (searchUrl) {
                    this.productsComponent.processXML(searchUrl);
                };
                __decorate([
                    core_1.ViewChild(products_component_1.ProductsComponent), 
                    __metadata('design:type', products_component_1.ProductsComponent)
                ], SearchComponent.prototype, "productsComponent", void 0);
                SearchComponent = __decorate([
                    core_1.Component({
                        selector: 'search',
                        template: "\n            <div id=\"search-form\" class=\"text-center\">\n                <form (ngSubmit)=\"onSubmit(searchUrl.value)\" >\n                    <div class=\"row\">\n                        <div class=\"col-md-10 col-sm-9\"><input #searchUrl type=\"text\" name=\"search_url\" class=\"swish-input\"\n                                                               placeholder=\"Valid XML Url here (Identical Structure)\">\n                        </div>\n                        <div class=\"col-md-2 col-sm-3\">\n                            <input type=\"submit\" class=\"button btn-white fluid\" value=\"Process\">\n                        </div>\n                    </div>\n                </form>\n            </div>\n            <div class=\"total-processed text-center\">\n            <h1 style=\"font-size:1.8rem; color:#fff ; font-weight: 100;\">Feeds Processed: <b style=\"font-size: 3rem; font-weight: bold;\">{{productsComponent.totalProcessed}}</b></h1>\n            </div>\n                <products-list class=\"products-list\">\n                </products-list>\n            ",
                        directives: [products_component_1.ProductsComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], SearchComponent);
                return SearchComponent;
            }());
            exports_1("SearchComponent", SearchComponent);
        }
    }
});

//# sourceMappingURL=search.component.js.map
