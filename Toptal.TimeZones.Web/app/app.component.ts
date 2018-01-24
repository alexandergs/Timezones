import { Component } from '@angular/core';
import { AuthenticationService } from "./shared/authenticationService"

@Component({
    selector: 'timezones-app',
  templateUrl: "./app.component.html",
  styles: []
})
export class AppComponent {
    title = 'Timezones';
    constructor(private authenticationService: AuthenticationService) {

    }
    ngOnInit() {
        if (this.authenticationService.tokenRequired) {
            this.authenticationService.loadBearerToken();
        }
    }
}
