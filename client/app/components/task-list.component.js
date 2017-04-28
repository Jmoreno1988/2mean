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
var task_services_1 = require("../services/task.services");
var TaskListComponent = (function () {
    function TaskListComponent(_taskService) {
        this._taskService = _taskService;
        this.editNode = null;
        this.selectedTaskNode = null;
        this.show = false;
    }
    TaskListComponent.prototype.ngOnInit = function () {
        this.tasks = this.getTasks();
    };
    TaskListComponent.prototype.getTasks = function () {
        return this._taskService.getTasks();
    };
    TaskListComponent.prototype.activateEditMode = function (id, i) {
        if (this.editNode != id) {
            this.editNode = id;
            this.selectedTaskNode = i;
        }
        else {
            this.editNode = null;
            this.selectedTaskNode = null;
        }
        this.show = false;
    };
    TaskListComponent.prototype.removeTask = function (id) {
        for (var i = 0; i < this.tasks.length; i++)
            if (this.tasks[i]._id == id)
                this.tasks.splice(i, 1);
    };
    TaskListComponent.prototype.getColorToPriority = function (priority) {
        var strColor = "";
        switch (priority) {
            case 1:
                strColor = "green";
                break;
            case 2:
                strColor = "yellow";
                break;
            case 3:
                strColor = "red";
                break;
        }
        return strColor;
    };
    return TaskListComponent;
}());
TaskListComponent = __decorate([
    core_1.Component({
        selector: "task-list",
        templateUrl: "./app/views/task-list.html",
        providers: [task_services_1.TaskService],
        styleUrls: ["./app/assets/css/task-list.styles.css"]
    }),
    __metadata("design:paramtypes", [task_services_1.TaskService])
], TaskListComponent);
exports.TaskListComponent = TaskListComponent;
//# sourceMappingURL=task-list.component.js.map