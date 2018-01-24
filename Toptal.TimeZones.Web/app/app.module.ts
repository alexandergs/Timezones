import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { UserManagement } from './userManagement/userManagement.component';
import { DataService } from "./shared/dataService"
import { AuthenticationService } from "./shared/authenticationService"
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

let routes = [
    { path: "", component: UserManagement, data: { title: "User Management" } },
    { path: "userManagement", component: UserManagement, data: {title: "User Management"} },
];

@NgModule({
  declarations: [
      AppComponent,
      UserManagement
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      enableTracing: false // for Debugging of the Routes
    })
  ],
  providers: [
      DataService,
      AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
