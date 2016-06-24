import {Component} from "@angular/core";
import {SearchComponent} from "./search.component";

//noinspection TypeScriptValidateTypes
@Component({
    selector: 'app',
    template: `<section>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="text-center">
                        <h1 class="white light">
                            TradeTracker Real-time XML Parser
                        </h1>
                        <p class="white light">
                            Displaying live big XML feeds processing using Laravel5.2, Angular2, XMLParser and Pusher
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-md-12">
                <search>

                </search>
            </div>
        </div>
    </section>`,
    directives: [SearchComponent],
})

export class AppComponent {

}