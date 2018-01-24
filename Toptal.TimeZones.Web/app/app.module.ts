import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { UserManagement } from './userManagement/userManagement.component';
//import { ProductList } from "./shop/productList.component";
//import { Cart } from "./shop/cart.component";
//import { Shop } from "./shop/shop.component";
//import { Checkout } from "./checkout/checkout.component";
import { Login } from "./login/login.component";
import { DataService } from "./shared/dataService"
import { AuthenticationService } from "./shared/authenticationService"
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

let routes = [
    { path: "userManagement", component: UserManagement, data: {title: "User Management"} },
    { path: "", component: Login },
  //{ path: "logout", component: Login }
];

@NgModule({
  declarations: [
      AppComponent,
      UserManagement,
    //ProductList,
    //Cart,
    //Shop,
    //Checkout,
    Login
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
