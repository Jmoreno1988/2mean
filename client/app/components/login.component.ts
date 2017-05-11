import { Component, OnInit } from "@angular/core";
import { SharedService } from "../services/shared.services";
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
    public isRegisterMode: boolean;
    public userName: string;
    public userPassword: string;

    constructor(
        private _userService: UserService,
        private _router: Router,
        private _sharedService: SharedService) {
    }

    ngOnInit() {
        this.isRegisterMode = false;
        this.titleApp = "2MEAN";
        this.subTitle = "- A todo list free, easy and mobile -";
        this.userName = null;
        this.userPassword = null;
    }

    public login() {
        if (this.userName && this.userPassword) {
            this._userService.loginUser({ name: this.userName, password: this.userPassword }).subscribe(
                res => {
                    console.log(res)
                    if (res && res.result && res.result._id) {
                        let r= res.result;
                        let id = r._id;
                        let name = r.name;
                        let tasks = r.tasks || [];
                        let thematic = r.thematic || [];

                        this._sharedService.user = new User(id, name, thematic, tasks);
                        this._router.navigate(["/taskList"]);
                    } else {
                        Log.error("Nombre de usuario o contraseña incorrectas.");
                    }
                },
                err => {
                    Log.error("Error en el servidor");
                });
        } else if (this.userName && !this.userPassword) {
            Log.info("Falta la contraseña");
        } else if (!this.userName && this.userPassword) {
            Log.info("Falta el usuario");
        }else if (!this.userName && !this.userPassword) {
            Log.info("Falta todo");
        }
    }

    public openRegisterForm() {
        this.isRegisterMode = true;
    }

    public closeRegisterForm() {
        this.isRegisterMode = false;
    }
}