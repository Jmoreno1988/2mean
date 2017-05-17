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
var router_1 = require("@angular/router");
var SettingsComponent = (function () {
    function SettingsComponent(_userService, _router, _sharedService) {
        this._userService = _userService;
        this._router = _router;
        this._sharedService = _sharedService;
    }
    SettingsComponent.prototype.ngOnInit = function () {
    };
    return SettingsComponent;
}());
SettingsComponent = __decorate([
    core_1.Component({
        selector: "settings",
        templateUrl: "./app/views/settings.html",
        providers: [user_services_1.UserService],
        styleUrls: ["./app/assets/css/settings.styles.css"]
    }),
    __metadata("design:paramtypes", [user_services_1.UserService,
        router_1.Router,
        shared_services_1.SharedService])
], SettingsComponent);
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=settings.component.js.map