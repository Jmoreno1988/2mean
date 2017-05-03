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
var taskModel_1 = require("../models/taskModel");
var TaskListComponent = (function () {
    function TaskListComponent(_taskService) {
        this._taskService = _taskService;
        this.editNode = null;
        this.selectedTaskNode = null;
        this.show = false;
        this.title = "All task";
    }
    TaskListComponent.prototype.ngOnInit = function () {
        this.getTasks();
    };
    TaskListComponent.prototype.getTasks = function () {
        var _this = this;
        this._taskService.getTasks().subscribe(function (res) {
            _this.tasks = [];
            for (var _i = 0, _a = res.tasks; _i < _a.length; _i++) {
                var t = _a[_i];
                _this.tasks.push(new taskModel_1.Task(t._id, t.title, t.description, t.date, t.priority));
            }
        }, function (err) {
            console.log("Error al recibir las tareas del servidor");
        });
    };
    TaskListComponent.prototype.deleteTask = function (id) {
        var _this = this;
        this._taskService.deleteTask(id).subscribe(function (res) {
            _this.getTasks();
        }, function (err) {
            console.log("Error al borrar tarea del servidor.");
        });
        this.editNode = null;
        this.selectedTaskNode = null;
    };
    TaskListComponent.prototype.addTask = function () {
        var _this = this;
        var newTask = new taskModel_1.Task("id", "Title", "Description", new Date(), 1);
        this._taskService.addTask(newTask).subscribe(function (res) {
            _this.getTasks();
        }, function (err) {
            console.log("Error al añadir una tarea nueva.");
        });
    };
    TaskListComponent.prototype.updateTask = function (id) {
        var _this = this;
        var task = this.getTaskById(id);
        if (task)
            this._taskService.updateTask(task).subscribe(function (res) {
                _this.getTasks();
            }, function (err) {
                console.log("Error al actualizar tarea.");
            });
    };
    TaskListComponent.prototype.openTask = function (id, i) {
        if (this.editNode != id) {
            this.editNode = id;
            this.selectedTaskNode = i;
        }
        this.show = false;
    };
    TaskListComponent.prototype.upPriority = function (_id) {
        var _this = this;
        this._taskService.upPriority(_id).subscribe(function (res) {
            _this.getTasks();
        }, function (err) {
            console.log("Error al subir prioridad de la tarea.");
        });
    };
    TaskListComponent.prototype.downPriority = function (_id) {
        var _this = this;
        this._taskService.downPriority(_id).subscribe(function (res) {
            _this.getTasks();
        }, function (err) {
            console.log("Error al bajar prioridad de la tarea.");
        });
    };
    TaskListComponent.prototype.toggleEdit = function () {
        this.isEdit ? this.isEdit = false : this.isEdit = true;
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
    TaskListComponent.prototype.getTaskById = function (id) {
        var task = null;
        for (var i = 0; i < this.tasks.length; i++)
            if (this.tasks[i]._id == id)
                task = this.tasks[i];
        return task;
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