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
var Log = (function () {
    function Log() {
    }
    Log.error = function (msg) {
        toastr.options.positionClass = "toast-bottom-full-width";
        toastr.options.preventDuplicates = true;
        toastr.error(msg);
    };
    Log.warning = function (msg) {
        toastr.options.positionClass = "toast-bottom-full-width";
        toastr.options.preventDuplicates = true;
        toastr.warning(msg);
    };
    Log.info = function (msg) {
        toastr.options.positionClass = "toast-bottom-full-width";
        toastr.options.preventDuplicates = true;
        toastr.info(msg);
    };
    return Log;
}());
Log.toastr = toastr;
Log.options = toastr.options;
Log = __decorate([
    core_1.Component({
        selector: "log",
        template: ""
    }),
    __metadata("design:paramtypes", [])
], Log);
exports.Log = Log;
//# sourceMappingURL=log.component.js.map