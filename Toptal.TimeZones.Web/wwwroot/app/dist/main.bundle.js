webpackJsonp(["main"],{

/***/ "../../../../../app/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../app/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../app/app.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var authenticationService_1 = __webpack_require__("../../../../../app/shared/authenticationService.ts");
var AppComponent = (function () {
    function AppComponent(authenticationService) {
        this.authenticationService = authenticationService;
        this.title = 'Timezones';
    }
    AppComponent.prototype.ngOnInit = function () {
        if (this.authenticationService.tokenRequired) {
            this.authenticationService.loadBearerToken();
        }
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'timezones-app',
        template: __webpack_require__("../../../../../app/app.component.html"),
        styles: []
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof authenticationService_1.AuthenticationService !== "undefined" && authenticationService_1.AuthenticationService) === "function" && _a || Object])
], AppComponent);
exports.AppComponent = AppComponent;
var _a;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../app/app.module.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
var app_component_1 = __webpack_require__("../../../../../app/app.component.ts");
var userManagement_component_1 = __webpack_require__("../../../../../app/userManagement/userManagement.component.ts");
//import { ProductList } from "./shop/productList.component";
//import { Cart } from "./shop/cart.component";
//import { Shop } from "./shop/shop.component";
//import { Checkout } from "./checkout/checkout.component";
var login_component_1 = __webpack_require__("../../../../../app/login/login.component.ts");
var dataService_1 = __webpack_require__("../../../../../app/shared/dataService.ts");
var authenticationService_1 = __webpack_require__("../../../../../app/shared/authenticationService.ts");
var router_1 = __webpack_require__("../../../router/@angular/router.es5.js");
var forms_1 = __webpack_require__("../../../forms/@angular/forms.es5.js");
var routes = [
    { path: "userManagement", component: userManagement_component_1.UserManagement, data: { title: "User Management" } },
    { path: "", component: login_component_1.Login },
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            userManagement_component_1.UserManagement,
            //ProductList,
            //Cart,
            //Shop,
            //Checkout,
            login_component_1.Login
        ],
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            router_1.RouterModule.forRoot(routes, {
                useHash: true,
                enableTracing: false // for Debugging of the Routes
            })
        ],
        providers: [
            dataService_1.DataService,
            authenticationService_1.AuthenticationService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../app/environments/environment.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
Object.defineProperty(exports, "__esModule", { value: true });
exports.environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\nLOGIN FORM\r\n</div>"

/***/ }),

/***/ "../../../../../app/login/login.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var dataService_1 = __webpack_require__("../../../../../app/shared/dataService.ts");
var router_1 = __webpack_require__("../../../router/@angular/router.es5.js");
var Login = (function () {
    function Login(data, router) {
        this.data = data;
        this.router = router;
        this.errorMessage = "";
        this.creds = {
            username: "",
            password: ""
        };
    }
    Login.prototype.onLogin = function () {
        //this.data.login(this.creds)
        //  .subscribe(success => {
        //    if (success) {
        //      if (this.data.order.items.length == 0) {
        //        this.router.navigate([""]);
        //      } else {
        //        this.router.navigate(["checkout"]);
        //      }
        //    }
        //  }, err => this.errorMessage = "Failed to login");
    };
    return Login;
}());
Login = __decorate([
    core_1.Component({
        selector: "login",
        template: __webpack_require__("../../../../../app/login/login.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof dataService_1.DataService !== "undefined" && dataService_1.DataService) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object])
], Login);
exports.Login = Login;
var _a, _b;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../app/main.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var platform_browser_dynamic_1 = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
var app_module_1 = __webpack_require__("../../../../../app/app.module.ts");
var environment_1 = __webpack_require__("../../../../../app/environments/environment.ts");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../../app/shared/authenticationService.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.token = "";
    }
    Object.defineProperty(AuthenticationService.prototype, "tokenRequired", {
        //public order: Order = new Order();
        //public products: Product[] = [];
        //public loadProducts(): Observable<Product[]> {
        //  return this.http.get("/api/users")
        //    .map((result: Response) => this.products = result.json());
        //}
        get: function () {
            return this.token.length == 0 || this.tokenExpiration > new Date();
        },
        enumerable: true,
        configurable: true
    });
    AuthenticationService.prototype.loadBearerToken = function () {
        var _this = this;
        return this.http.get("/account/getbearertoken")
            .subscribe(function (data) {
            var tokenInfo = data.json();
            _this.token = tokenInfo.token;
            _this.tokenExpiration = tokenInfo.expiration;
        });
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
var _a;
//# sourceMappingURL=authenticationService.js.map

/***/ }),

/***/ "../../../../../app/shared/dataService.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var http_1 = __webpack_require__("../../../http/@angular/http.es5.js");
__webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this.token = "";
        //public order: Order = new Order();
        this.allUsers = [];
    }
    DataService.prototype.loadAllUsersInfo = function () {
        var _this = this;
        return this.http.get("/account/getallusers")
            .map(function (result) { return _this.allUsers = result.json(); });
    };
    DataService.prototype.updateUserRole = function (userInfo) {
        return this.http.put("/account/updateUserRole?id=" + userInfo.email, userInfo, {
            headers: new http_1.Headers({ "Authorization": "Bearer " + this.token })
        });
    };
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], DataService);
exports.DataService = DataService;
var _a;
//# sourceMappingURL=dataService.js.map

/***/ }),

/***/ "../../../../../app/userManagement/userManagement.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../app/userManagement/userManagement.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <h3>\r\n        {{title}}\r\n    </h3>\r\n    <div class=\"container\">\r\n        <div class=\"col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3  col-sm-8 col-sm-offset-2 col-xs-12\">\r\n            <div *ngIf=\"errorMessage\" class=\"alert alert-warning\">{{ errorMessage }}</div>\r\n            <div *ngIf=\"successMessage\" class=\"alert alert-success\">{{ successMessage }}</div>\r\n            <table class=\"table table-bordered table-hover\">\r\n                <thead>\r\n                    <tr>\r\n                        <th>User</th>\r\n                        <th>Role</th>\r\n                        <th></th>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr *ngFor=\"let userInfo of allUsers\">\r\n                        <td>{{ userInfo.email }}</td>\r\n                        <td>\r\n                            <select [(ngModel)]=\"userInfo.role\" (change)=\"onChangeRoleSelect($event, userInfo)\">\r\n                                <option value=\"\" [selected]=\"userInfo.role == ''\">Member</option>\r\n                                <option value=\"Admin\" [selected]=\"userInfo.role == 'Admin'\">Admin</option>\r\n                                <option value=\"Manager\" [selected]=\"userInfo.role == 'Manager'\">Manager</option>\r\n                            </select>\r\n                        </td>\r\n                        <td>\r\n                            <button>Delete</button>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../app/userManagement/userManagement.component.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__("../../../core/@angular/core.es5.js");
var dataService_1 = __webpack_require__("../../../../../app/shared/dataService.ts");
var UserManagement = (function () {
    function UserManagement(data) {
        this.data = data;
        this.title = "User Management";
        this.errorMessage = "";
        this.successMessage = "";
        this.allUsers = this.data.allUsers;
    }
    UserManagement.prototype.onChangeRoleSelect = function ($event, userInfo) {
        var _this = this;
        this.data.updateUserRole(userInfo)
            .subscribe(function () {
            _this.errorMessage = "";
            _this.successMessage = "Role updated.";
        }, function (err) { return _this.errorMessage = "Failed to update user's role."; });
        return true;
    };
    UserManagement.prototype.ngOnInit = function () {
        var _this = this;
        this.data.loadAllUsersInfo()
            .subscribe(function () {
            return _this.allUsers = _this.data.allUsers;
        }, function (err) { return _this.errorMessage = "Failed to login"; });
    };
    return UserManagement;
}());
UserManagement = __decorate([
    core_1.Component({
        selector: "user-management",
        template: __webpack_require__("../../../../../app/userManagement/userManagement.component.html"),
        styles: [__webpack_require__("../../../../../app/userManagement/userManagement.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof dataService_1.DataService !== "undefined" && dataService_1.DataService) === "function" && _a || Object])
], UserManagement);
exports.UserManagement = UserManagement;
var _a;
//# sourceMappingURL=userManagement.component.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../app/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map