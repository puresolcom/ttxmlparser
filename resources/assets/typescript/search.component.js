"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var searchComponent = (function () {
    function searchComponent() {
    }
    searchComponent = __decorate([
        core_1.Component({
            selector: 'search',
            template: "\n            <div id=\"search-form\" class=\"text-center\">\n                <form>\n                    <div class=\"row\">\n                        <div class=\"col-md-10 col-sm-9\"><input class=\"swish-input\"\n                                                               placeholder=\"http://pf.tradetracker.net/?aid=1&type=xml&encoding=utf-8&fid=251713&categoryType=2&additionalType=2\">\n                        </div>\n                        <div class=\"col-md-2 col-sm-3\">\n                            <button class=\"btn-white fluid\">Process</button>\n                        </div>\n                    </div>\n                </form>\n            </div>"
        })
    ], searchComponent);
    return searchComponent;
}());
exports.searchComponent = searchComponent;
//# sourceMappingURL=search.component.js.map