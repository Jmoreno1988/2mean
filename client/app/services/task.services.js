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
var taskModel_1 = require("../models/taskModel");
var TaskService = (function () {
    function TaskService(_http) {
        this._http = _http;
    }
    TaskService.prototype.getTasks = function () {
        return [
            new taskModel_1.Task("1", "Tarea de prueba", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut mollis tellus. Ut in lorem in ipsum sollicitudin consectetur. Morbi volutpat vitae turpis quis luctus. Nullam vel pretium est. Pellentesque posuere malesuada ante, eu aliquet quam. Donec sit amet cursus metus. Sed mauris ligula, auctor eget libero quis, blandit ultrices tellus. Morbi scelerisque nunc at tellus scelerisque ultricies. Quisque laoreet lobortis faucibus. Donec vehicula blandit faucibus. Nam ac arcu et orci tincidunt ornare. Nullam id neque ut quam posuere suscipit eu a justo. Suspendisse eu est tortor. Duis ac luctus tellus. Vivamus dictum vestibulum lacus, sed tincidunt metus ullamcorper et. Curabitur egestas velit quis sem vulputate efficitur.", new Date(), 1),
            new taskModel_1.Task("2", "Tarea de prueba 2", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut mollis tellus. Ut in lorem in ipsum sollicitudin consectetur. Morbi volutpat vitae turpis quis luctus. Nullam vel pretium est. Pellentesque posuere malesuada ante, eu aliquet quam. Donec sit amet cursus metus. Sed mauris ligula, auctor eget libero quis, blandit ultrices tellus. Morbi scelerisque nunc at tellus scelerisque ultricies. Quisque laoreet lobortis faucibus. Donec vehicula blandit faucibus. Nam ac arcu et orci tincidunt ornare. Nullam id neque ut quam posuere suscipit eu a justo. Suspendisse eu est tortor. Duis ac luctus tellus. Vivamus dictum vestibulum lacus, sed tincidunt metus ullamcorper et. Curabitur egestas velit quis sem vulputate efficitur.", new Date(), 2),
            new taskModel_1.Task("3", "Tarea de prueba 3", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut mollis tellus. Ut in lorem in ipsum sollicitudin consectetur. Morbi volutpat vitae turpis quis luctus. Nullam vel pretium est. Pellentesque posuere malesuada ante, eu aliquet quam. Donec sit amet cursus metus. Sed mauris ligula, auctor eget libero quis, blandit ultrices tellus. Morbi scelerisque nunc at tellus scelerisque ultricies. Quisque laoreet lobortis faucibus. Donec vehicula blandit faucibus. Nam ac arcu et orci tincidunt ornare. Nullam id neque ut quam posuere suscipit eu a justo. Suspendisse eu est tortor. Duis ac luctus tellus. Vivamus dictum vestibulum lacus, sed tincidunt metus ullamcorper et. Curabitur egestas velit quis sem vulputate efficitur.", new Date(), 3),
        ];
    };
    TaskService.prototype.getTask = function (id) {
    };
    TaskService.prototype.addTask = function (favorite) {
    };
    TaskService.prototype.editTask = function (favorite) {
    };
    TaskService.prototype.deleteTask = function (id) {
    };
    return TaskService;
}());
TaskService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.services.js.map