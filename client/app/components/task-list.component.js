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
var task_services_1 = require("../services/task.services");
var user_services_1 = require("../services/user.services");
var thematic_services_1 = require("../services/thematic.services");
var taskModel_1 = require("../models/taskModel");
var thematicModel_1 = require("../models/thematicModel");
var router_1 = require("@angular/router");
var TaskListComponent = (function () {
    function TaskListComponent(_taskService, _userService, _thematicService, _router, _sharedService) {
        this._taskService = _taskService;
        this._userService = _userService;
        this._thematicService = _thematicService;
        this._router = _router;
        this._sharedService = _sharedService;
        this.editNode = null;
        this.selectedTaskNode = null;
        this.selectedTaskNodeRemove = null;
        this.selectedThematic = null;
        this.timeout = null;
        this.title = "All task";
        this.isSaving = false;
        this.user = this._sharedService.user;
        this.tasks = [];
        this.thematics = [];
        this.idThematicSelected = null;
        this.isShowMenusettings = false;
    }
    TaskListComponent.prototype.ngAfterViewInit = function () {
        document.getElementById('menuSettings').addEventListener('click', function (event) {
            event.stopPropagation();
        });
        document.getElementById('buttonMenusettings').addEventListener('click', function (event) {
            event.stopPropagation();
        });
    };
    TaskListComponent.prototype.ngOnInit = function () {
        if (!this.user) {
            this._router.navigate([""]);
            return;
        }
        this.thematics = this.getAllThematics();
        this.tasks = this.getAllTasks();
        $(window).click(function () {
            this.hiddenMenuSettings();
        }.bind(this));
    };
    TaskListComponent.prototype.search = function () {
        var substring = "texto";
        var tasks = [];
        for (var _i = 0, _a = this.user.tasks; _i < _a.length; _i++) {
            var t = _a[_i];
            if (t.description.includes(substring)) {
                tasks.push(t);
            }
        }
        this.tasks = tasks;
    };
    TaskListComponent.prototype.logout = function () {
        this.user = null;
        this.thematics = null;
        this.tasks = null;
        this._router.navigate([""]);
    };
    TaskListComponent.prototype.getTasksByThematic = function (idThematic) {
        var tasks = [];
        for (var _i = 0, _a = this.user.tasks; _i < _a.length; _i++) {
            var t = _a[_i];
            if (idThematic == t.thematicId)
                tasks.push(new taskModel_1.Task(t._id, t.title, t.description, t.date, t.priority, this.user._id, t.thematicId));
        }
        return tasks;
    };
    TaskListComponent.prototype.getAllTasks = function () {
        var tasks = [];
        for (var _i = 0, _a = this.user.tasks; _i < _a.length; _i++) {
            var t = _a[_i];
            tasks.push(new taskModel_1.Task(t._id, t.title, t.description, t.date, t.priority, this.user._id, t.thematicId));
        }
        return tasks;
    };
    TaskListComponent.prototype.getAllThematics = function () {
        var thematics = [];
        for (var _i = 0, _a = this.user.thematics; _i < _a.length; _i++) {
            var t = _a[_i];
            thematics.push(new thematicModel_1.Thematic(t._id, t.title, this.user._id));
        }
        return thematics;
    };
    TaskListComponent.prototype.selectThematic = function (idThematic, i) {
        this.idThematicSelected = idThematic;
        this.selectedThematic = i;
        this.tasks = this.getTasksByThematic(idThematic);
        this.title = this.getThematicById(idThematic).title;
    };
    TaskListComponent.prototype.selectAllTasks = function (idThematic) {
        this.idThematicSelected = null;
        this.selectedThematic = null;
        this.tasks = this.getAllTasks();
        this.title = "All task";
    };
    TaskListComponent.prototype.getTasks = function () {
        var _this = this;
        this._taskService.getTasks().subscribe(function (res) {
            _this.tasks = [];
            for (var _i = 0, _a = res.tasks; _i < _a.length; _i++) {
                var t = _a[_i];
                _this.tasks.push(new taskModel_1.Task(t._id, t.title, t.description, t.date, t.priority, _this.user._id, t.thematicId));
            }
        }, function (err) {
            console.log("Error al recibir las tareas del servidor");
        });
    };
    TaskListComponent.prototype.deleteTask = function (evt, id, i) {
        var _this = this;
        evt.stopPropagation();
        this.selectedTaskNodeRemove = i;
        this.editNode = null;
        this.selectedTaskNode = null;
        setTimeout(function () {
            _this._taskService.deleteTask(id).subscribe(function (res) {
                _this.getTasks();
                _this.selectedTaskNodeRemove = null;
            }, function (err) {
                console.log("Error al borrar tarea del servidor.");
            });
        }, 500);
    };
    TaskListComponent.prototype.createTask = function () {
        var newTask = new taskModel_1.Task("id", "Title", "Description", new Date(), 1, this.user._id, this.idThematicSelected);
        this._taskService.createTask(newTask).subscribe(function (res) {
            console.log(res);
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
                _this.isSaving = false;
            }, function (err) {
                console.log("Error al actualizar tarea.");
                _this.isSaving = false;
            });
    };
    TaskListComponent.prototype.openTask = function (id, i) {
        if (this.editNode != id) {
            this.editNode = id;
            this.selectedTaskNode = i;
        }
    };
    TaskListComponent.prototype.createThematic = function () {
        var newThematic = new thematicModel_1.Thematic("id", "Projects", this.user._id);
        this._thematicService.createThematic(newThematic).subscribe(function (res) {
            console.log(res);
        }, function (err) {
            console.log("Error al añadir la tematica nueva.");
        });
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
    TaskListComponent.prototype.isFinishEdition = function (id) {
        var _this = this;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
            _this.isSaving = true;
            _this.updateTask(id);
        }, 500);
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
    TaskListComponent.prototype.getThematicById = function (id) {
        var thematic = null;
        for (var i = 0; i < this.thematics.length; i++)
            if (this.thematics[i]._id == id)
                thematic = this.thematics[i];
        return thematic;
    };
    TaskListComponent.prototype.showMenuSettings = function () {
        this.isShowMenusettings = true;
    };
    TaskListComponent.prototype.hiddenMenuSettings = function () {
        this.isShowMenusettings = false;
    };
    TaskListComponent.prototype.goTo = function (destination) {
        this._router.navigate([destination]);
    };
    return TaskListComponent;
}());
TaskListComponent = __decorate([
    core_1.Component({
        selector: "task-list",
        templateUrl: "./app/views/task-list.html",
        providers: [task_services_1.TaskService, user_services_1.UserService, thematic_services_1.ThematicService],
        styleUrls: ["./app/assets/css/task-list.styles.css"]
    }),
    __metadata("design:paramtypes", [task_services_1.TaskService,
        user_services_1.UserService,
        thematic_services_1.ThematicService,
        router_1.Router,
        shared_services_1.SharedService])
], TaskListComponent);
exports.TaskListComponent = TaskListComponent;
//# sourceMappingURL=task-list.component.js.map