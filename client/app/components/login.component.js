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
var user_services_1 = require("../services/user.services");
var router_1 = require("@angular/router");
var LoginComponent = (function () {
    function LoginComponent(_userService, _router) {
        this._userService = _userService;
        this._router = _router;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.isRegisterMode = false;
        this.titleApp = "2MEAN";
        this.subTitle = "- A todo list free, easy and mobile -";
    };
    LoginComponent.prototype.login = function () {
        this._router.navigate(["/taskList/" + 1]);
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
        router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map