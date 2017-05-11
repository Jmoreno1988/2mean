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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var UserService = (function () {
    function UserService(_http) {
        this._http = _http;
        this.url = "http://localhost:3688/api";
        this.user = null;
    }
    UserService.prototype.loginUser = function (userLogin) {
        var json = JSON.stringify(userLogin);
        var params = json;
        var headers = new http_1.Headers({
            "Content-Type": "application/json"
        });
        return this._http.post(this.url + "/getAllInfoUser", params, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    UserService.prototype.getAllIInfoUser = function (id) {
        return this._http.get(this.url + "/getAllTask/" + id).map(function (res) { return res.json(); });
    };
    UserService.prototype.setUser = function (user) {
        this.user = user;
    };
    UserService.prototype.getUser = function () {
        return this.user;
    };
    return UserService;
}());
UserService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.services.js.map