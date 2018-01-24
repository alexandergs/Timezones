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
var core_1 = require("@angular/core");
var dataService_1 = require("../shared/dataService");
var UserManagement = /** @class */ (function () {
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
    UserManagement.prototype.onDelete = function ($event, userInfo) {
        var _this = this;
        this.data.deleteUser(userInfo)
            .subscribe(function () {
            _this.errorMessage = "";
            _this.successMessage = "User deleted.";
        }, function (err) { return _this.errorMessage = "Failed to delete user."; });
        return true;
    };
    UserManagement.prototype.ngOnInit = function () {
        var _this = this;
        this.data.loadAllUsersInfo()
            .subscribe(function () {
            return _this.allUsers = _this.data.allUsers;
        }, function (err) { return _this.errorMessage = "Failed to login"; });
    };
    UserManagement = __decorate([
        core_1.Component({
            selector: "user-management",
            templateUrl: "userManagement.component.html",
            styleUrls: ["userManagement.component.css"]
        }),
        __metadata("design:paramtypes", [dataService_1.DataService])
    ], UserManagement);
    return UserManagement;
}());
exports.UserManagement = UserManagement;
//# sourceMappingURL=userManagement.component.js.map