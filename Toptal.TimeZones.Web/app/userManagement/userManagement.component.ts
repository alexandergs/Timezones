import { Component, OnInit, NgModule } from "@angular/core"
import { DataService } from "../shared/dataService";
import { UserInfoViewModel } from "../shared/userInfoViewModel"
import { Router } from '@angular/router';
import * as _ from "lodash";

@Component({
    selector: "user-management",
    templateUrl: "userManagement.component.html",
    styleUrls: ["userManagement.component.css"]
})

export class UserManagement implements OnInit {

    title = "User Management";
    errorMessage: string = "";
    successMessage: string = "";
    showAddUser: boolean = false;

    public newUser = {
        email: "",
        password: "",
        passwordConfirm: "",
        role: ""
    };

    public allUsers: UserInfoViewModel[];

    constructor(private data: DataService) {
        this.allUsers = this.data.allUsers;
    }

    removeUserFromList(email: string) {
        this.allUsers = this.allUsers.filter(item => item.email !== email);
    }

    onChangeRoleSelect($event, userInfo) {
        this.data.updateUserRole(userInfo)
            .subscribe(() => {
                this.errorMessage = "";
                this.successMessage = "Role updated.";
            },
            err => this.errorMessage = "Failed to update user's role.");
        return true;
    }

    onDelete($event, userInfo) {
        this.data.deleteUser(userInfo)
            .subscribe(() => {
                this.removeUserFromList(userInfo.email);
                this.errorMessage = "";
                this.successMessage = "User deleted.";
            },
            err => this.errorMessage = "Failed to delete user.");
        return true;
    }

    onAddUser () {
        this.showAddUser = true;
        return true;
    };

    onGoBack() {
        //remember to clear the new fields
        this.showAddUser = false;
    }

    onSaveUser($event, newUser) {
        if (newUser.password != newUser.passwordConfirm)
            this.errorMessage = "Password entries dont match";
        let userInfo = {
            userName: newUser.email,
            email: newUser.email,
            password: newUser.password,
            confirmPassword: newUser.passwordConfirm,
            role: newUser.role
        };
        this.data.registerUser(userInfo)
            .subscribe(() => {
                this.errorMessage = "";
                this.successMessage = "User Created.";
                this.allUsers.push({
                    userName: newUser.email,
                    email: newUser.email,
                    role: newUser.role,
                    password: "",
                    confirmPassword: ""
                });
                this.newUser = {
                    email: "",
                    role: "",
                    password: "",
                    passwordConfirm: ""
                };
                this.showAddUser = false;
            },
            err => {
                this.errorMessage = "Failed while creating the user. User might already exist.";
                this.successMessage = "";
            });

        return true;
    }

    ngOnInit() {
        this.data.loadAllUsersInfo()
            .subscribe(() =>
                this.allUsers = this.data.allUsers,
            err => this.errorMessage = "Failed to login");
    }
}