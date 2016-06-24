import {Component, ViewChild} from "@angular/core";
import {ProductsComponent} from "./products.component";

@Component({
    selector: 'search',
    template: `
            <div id="search-form" class="text-center">
                <form (ngSubmit)="onSubmit(searchUrl.value)" >
                    <div class="row">
                        <div class="col-md-10 col-sm-9"><input #searchUrl type="text" name="search_url" class="swish-input"
                                                               placeholder="Valid XML Url here (Identical Structure)">
                        </div>
                        <div class="col-md-2 col-sm-3">
                            <input type="submit" class="button btn-white fluid" value="Process">
                        </div>
                    </div>
                </form>
            </div>
            <div class="total-processed text-center">
            <h1 style="font-size:1.8rem; color:#fff ; font-weight: 100;">Feeds Processed: <b style="font-size: 3rem; font-weight: bold;">{{productsComponent.totalProcessed}}</b></h1>
            </div>
                <products-list class="products-list">
                </products-list>
            `,
    directives: [ProductsComponent]
})

export class SearchComponent {
    @ViewChild(ProductsComponent)
    productsComponent:ProductsComponent;

    constructor() {

    }

    onSubmit(searchUrl) {
        this.productsComponent.processXML(searchUrl);
    }
}