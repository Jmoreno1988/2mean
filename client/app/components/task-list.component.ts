declare var $: any;

import { Component, OnInit } from "@angular/core";
import { SharedService } from "../services/shared.services";
import { TaskService } from "../services/task.services";
import { UserService } from "../services/user.services";
import { ThematicService } from "../services/thematic.services";
import { Task } from "../models/taskModel";
import { Thematic } from "../models/thematicModel";
import { User } from "../models/userModel";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
    selector: "task-list",
    templateUrl: "./app/views/task-list.html",
    providers: [TaskService, UserService, ThematicService],
    styleUrls: ["./app/assets/css/task-list.styles.css"]
})

export class TaskListComponent implements OnInit {

    private user: User;
    public tasks: Array<Task>;
    public thematics: Array<Thematic>;
    public editNode: any;
    public selectedTaskNode: number;
    public selectedThematic: number;
    public selectedTaskNodeRemove: number;
    public strColor: string;
    public isEdit: boolean;
    public title: string;
    public timeout: any;
    public isSaving: boolean;
    public idThematicSelected: string;
    public isShowMenusettings: boolean;
    public isShowMenuSort: boolean;
    public menuSettings: any;

    constructor(
        private _taskService: TaskService,
        private _userService: UserService,
        private _thematicService: ThematicService,
        private _router: Router,
        private _sharedService: SharedService
    ) {
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
        this.isShowMenuSort = false;
    }

    ngAfterViewInit() {
        document.getElementById('menuSettings').addEventListener('click', function (event: any) {
            event.stopPropagation();
        });
        document.getElementById('buttonMenusettings').addEventListener('click', function (event: any) {
            event.stopPropagation();
        });

        document.getElementById('menuSort').addEventListener('click', function (event: any) {
            event.stopPropagation();
        });
        document.getElementById('buttonMenuSort').addEventListener('click', function (event: any) {
            event.stopPropagation();
        });
    }

    ngOnInit() {
        // Si no hay usuario, volvemos a la ventana de Login
        if (!this.user) {
            this._router.navigate([""]);
            return;
        }

        // Cargamos todas las tematicas y tareas
        this.thematics = this.getAllThematics();
        this.tasks = this.getAllTasks();

        $(window).click(function () {
            //Hide the menus if visible
            this.hiddenMenuSettings();
            this.hiddenMenuSort();
        }.bind(this));
    }

    public search() {
        let substring = "texto"
        let tasks: Array<Task> = [];
        for (let t of this.user.tasks) {
            if(t.description.includes(substring)){
                tasks.push(t);
            }
        }

        this.tasks = tasks;
    }

    public logout() {
        this.user = null;
        this.thematics = null;
        this.tasks = null;
        this._router.navigate([""]);
    }

    private getTasksByThematic(idThematic: string) {
        let tasks: Array<Task> = [];

        for (let t of this.user.tasks)
            if (idThematic == t.thematicId)
                tasks.push(new Task(t._id, t.title, t.description, t.date, t.priority, this.user._id, t.thematicId));

        return tasks;
    }

    private getAllTasks() {
        let tasks: Array<Task> = [];

        for (let t of this.user.tasks)
            tasks.push(new Task(t._id, t.title, t.description, t.date, t.priority, this.user._id, t.thematicId));

        return tasks;
    }

    private getAllThematics() {
        let thematics: Array<Thematic> = [];

        for (let t of this.user.thematics)
            thematics.push(new Thematic(t._id, t.title, this.user._id));

        return thematics;
    }

    private selectThematic(idThematic: string, i: any) {
        this.idThematicSelected = idThematic;
        this.selectedThematic = i;
        this.tasks = this.getTasksByThematic(idThematic)
        this.title = this.getThematicById(idThematic).title;
    }

    private selectAllTasks(idThematic: string) {
        this.idThematicSelected = null;
        this.selectedThematic = null;
        this.tasks = this.getAllTasks();
        this.title = "All task";
    }

    private getTasks() {
        this._taskService.getTasks().subscribe(
            res => {
                this.tasks = []; // Limpia la lista

                for (let t of res.tasks)
                    this.tasks.push(new Task(t._id, t.title, t.description, t.date, t.priority, this.user._id, t.thematicId));
            },
            err => {
                console.log("Error al recibir las tareas del servidor");
            });
    }

    public deleteTask(evt: any, id: string, i: any) {
        evt.stopPropagation();
        this.selectedTaskNodeRemove = i;
        this.editNode = null;
        this.selectedTaskNode = null;

        setTimeout(() => {
            this._taskService.deleteTask(id).subscribe(
                res => {
                    this.getTasks();
                    this.selectedTaskNodeRemove = null;
                },
                err => {
                    console.log("Error al borrar tarea del servidor.");
                })
        }, 500);
    }

    public createTask() {
        let newTask: Task = new Task("id", "Title", "Description", new Date(), 1, this.user._id, this.idThematicSelected);

        this._taskService.createTask(newTask).subscribe(
            res => {
                console.log(res)
            },
            err => {
                console.log("Error al añadir una tarea nueva.");
            });
    }

    public updateTask(id: string) {
        let task = this.getTaskById(id);

        if (task)
            this._taskService.updateTask(task).subscribe(
                res => {
                    this.getTasks();
                    this.isSaving = false;
                },
                err => {
                    console.log("Error al actualizar tarea.");
                    this.isSaving = false;
                });
    }

    public openTask(id: string, i: number) {
        if (this.editNode != id) {
            this.editNode = id;
            this.selectedTaskNode = i;
        }/* else {
            this.editNode = null;
            this.selectedTaskNode = null;
        }*/
    }

    public createThematic() {
        let newThematic: Thematic = new Thematic("id", "Projects", this.user._id);

        this._thematicService.createThematic(newThematic).subscribe(
            res => {
                console.log(res);
            },
            err => {
                console.log("Error al añadir la tematica nueva.");
            });
    }

    public upPriority(_id: string) {
        this._taskService.upPriority(_id).subscribe(
            res => {
                this.getTasks();
            },
            err => {
                console.log("Error al subir prioridad de la tarea.");
            });
    }

    public downPriority(_id: string) {
        this._taskService.downPriority(_id).subscribe(
            res => {
                this.getTasks();
            },
            err => {
                console.log("Error al bajar prioridad de la tarea.");
            });
    }

    public isFinishEdition(id: string) {
        clearTimeout(this.timeout);

        this.timeout = setTimeout(() => {
            this.isSaving = true;
            this.updateTask(id);
        }, 500);
    }

    public toggleEdit() {
        this.isEdit ? this.isEdit = false : this.isEdit = true;
    }

    private getColorToPriority(priority: number) {
        let strColor = "";
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
    }

    private getTaskById(id: string): Task {
        let task: any = null

        for (let i = 0; i < this.tasks.length; i++)
            if (this.tasks[i]._id == id)
                task = this.tasks[i];

        return task;
    }

    private getThematicById(id: string): Thematic {
        let thematic: Thematic = null;

        for (let i = 0; i < this.thematics.length; i++)
            if (this.thematics[i]._id == id)
                thematic = this.thematics[i];

        return thematic;
    }

    public showMenuSettings() {
        this.isShowMenusettings = true;
    }

    public hiddenMenuSettings() {
        this.isShowMenusettings = false;
    }

    public showMenuSort() {
        this.isShowMenuSort = true;
    }

    public hiddenMenuSort() {
        this.isShowMenuSort = false;
    }

    public goTo(destination: string) {
        this._router.navigate([destination]);
    }
}