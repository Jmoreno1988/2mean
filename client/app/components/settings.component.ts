declare var $: any;

import { Component, OnInit } from "@angular/core";
import { SharedService } from "../services/shared.services";
import { UserService } from "../services/user.services";
import { User } from "../models/userModel";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
    selector: "settings",
    templateUrl: "./app/views/settings.html",
    providers: [UserService],
    styleUrls: ["./app/assets/css/settings.styles.css"]
})

export class SettingsComponent implements OnInit {

    constructor(
        private _userService: UserService,
        private _router: Router,
        private _sharedService: SharedService
    ) {}

    ngOnInit() {
       
    }
}