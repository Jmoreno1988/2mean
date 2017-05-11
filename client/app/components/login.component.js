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
var shared_services_1 = require("../services/shared.services");
var user_services_1 = require("../services/user.services");
var userModel_1 = require("../models/userModel");
var router_1 = require("@angular/router");
var log_component_1 = require("./log.component");
var LoginComponent = (function () {
    function LoginComponent(_userService, _router, _sharedService) {
        this._userService = _userService;
        this._router = _router;
        this._sharedService = _sharedService;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.isRegisterMode = false;
        this.titleApp = "2MEAN";
        this.subTitle = "- A todo list free, easy and mobile -";
        this.userName = null;
        this.userPassword = null;
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        if (this.userName && this.userPassword) {
            this._userService.loginUser({ name: this.userName, password: this.userPassword }).subscribe(function (res) {
                console.log(res);
                if (res && res.result && res.result._id) {
                    var r = res.result;
                    var id = r._id;
                    var name_1 = r.name;
                    var tasks = r.tasks || [];
                    var thematic = r.thematic || [];
                    _this._sharedService.user = new userModel_1.User(id, name_1, thematic, tasks);
                    _this._router.navigate(["/taskList"]);
                }
                else {
                    log_component_1.Log.error("Nombre de usuario o contraseña incorrectas.");
                }
            }, function (err) {
                log_component_1.Log.error("Error en el servidor");
            });
        }
        else if (this.userName && !this.userPassword) {
            log_component_1.Log.info("Falta la contraseña");
        }
        else if (!this.userName && this.userPassword) {
            log_component_1.Log.info("Falta el usuario");
        }
        else if (!this.userName && !this.userPassword) {
            log_component_1.Log.info("Falta todo");
        }
    };
    LoginComponent.prototype.openRegisterForm = function () {
        this.isRegisterMode = true;
    };
    LoginComponent.prototype.closeRegisterForm = function () {
        this.isRegisterMode = false;
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: "login",
        templateUrl: "./app/views/login.html",
        providers: [user_services_1.UserService],
        styleUrls: ["./app/assets/css/login.styles.css"]
    }),
    __metadata("design:paramtypes", [user_services_1.UserService,
        router_1.Router,
        shared_services_1.SharedService])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map