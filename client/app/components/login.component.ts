import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.services";
import { User } from "../models/userModel";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Log } from "./log.component";

@Component({
    selector: "login",
    templateUrl: "./app/views/login.html",
    providers: [UserService],
    styleUrls: ["./app/assets/css/login.styles.css"]
})

export class LoginComponent implements OnInit {

    public user: User;
    public titleApp: string;
    public subTitle: string;

    constructor(
        private _userService: UserService,
        private _router: Router) {
    }

    ngOnInit() {
        this.titleApp = "2MEAN";
        this.subTitle = "- A todo list free, easy and mobile -"
    }

    public login() {
        this._router.navigate(["/taskList/"+ 1])
    }
}