import { Component, OnInit } from "@angular/core";
import { SharedService } from "../services/shared.services";
import { UserService } from "../services/user.services";
import { User } from "../models/userModel";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Log } from "./log.component";
import { Encrypt } from "./encrypt.component";

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
    public userNameRegis: string;
    public passwordRegis: string;
    public rePasswordRegis: string;
    public emailRegis: string;

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
        this.userNameRegis = null;
        this.passwordRegis = null;
        this.rePasswordRegis = null;
        this.emailRegis = null;
    }

    public login() {
        if (this.userName && this.userPassword) {
            let hash = Encrypt.generateHash(this.userPassword);
            this._userService.loginUser({ user: this.userName, password: hash }).subscribe(
                res => {
                    console.log(res)
                    if (res && res.id) {
                        let id = res.id;
                        let name = res.userName;
                        let tasks = res.tasks || [];
                        let thematic = res.thematics || [];
                        let token = "";

                        this._sharedService.user = new User(id, name, thematic, tasks, token);
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
        } else if (!this.userName && !this.userPassword) {
            Log.info("Falta todo");
        }
    }

    public createUser() {
        // Comprobar el name es valido
        // comprobar qyue la contraseña es valida
        // Comprobar que el mail es valido
        if (this.userNameRegis && this.passwordRegis == this.rePasswordRegis && this.emailRegis) {
            let hash = Encrypt.generateHash(this.passwordRegis);
            this._userService.createUser({ name: this.userNameRegis, password: hash, email: this.emailRegis }).subscribe(
                res => {
                    if(!res.user) {
                        Log.error("Usuario ya existe");
                        return;
                    } else {
                        Log.info("Usuario creaod correctamente");
                        this.closeRegisterForm();
                    }
                },
                err => {
                    Log.error("Error en el servidor");
                });
        } else if (!this.userNameRegis) {
            Log.info("Falta el nombre");
        } else if (!this.passwordRegis || !this.rePasswordRegis) {
            Log.info("Falta contraseña");
        } else if (!this.emailRegis) {
            Log.info("Falta el email");
        } else if (this.passwordRegis != this.rePasswordRegis) {
            Log.info("Las contraseñas no son iguales");
        } 
    }

    public openRegisterForm() {
        this.isRegisterMode = true;
    }

    public closeRegisterForm() {
        this.isRegisterMode = false;
        this.userNameRegis = null;
        this.passwordRegis = null;
        this.rePasswordRegis = null;
        this.emailRegis = null;
    }
}