import { Component, OnInit, NgModule } from "@angular/core"
import { DataService } from "../shared/dataService";
import { UserInfoViewModel } from "../shared/userInfoViewModel"
import * as _ from "lodash";

@Component({
    selector: "user-management",
    templateUrl: "userManagement.component.html",
    styleUrls: ["userManagement.component.css"]
})
export class UserManagement implements OnInit{

    title = "User Management";
    errorMessage: string = "";
    successMessage: string = "";

    public allUsers: UserInfoViewModel[];

    constructor(private data: DataService) {
        this.allUsers = this.data.allUsers;
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

    ngOnInit() {
        this.data.loadAllUsersInfo()
            .subscribe(() =>
                this.allUsers = this.data.allUsers,
                err => this.errorMessage = "Failed to login");
    }
}