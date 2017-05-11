import { Component, OnInit } from "@angular/core";
import { SharedService } from "../services/shared.services";
import { TaskService } from "../services/task.services";
import { UserService } from "../services/user.services";
import { Task } from "../models/taskModel";
import { User } from "../models/userModel";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
    selector: "task-list",
    templateUrl: "./app/views/task-list.html",
    providers: [TaskService, UserService],
    styleUrls: ["./app/assets/css/task-list.styles.css"]
})

export class TaskListComponent implements OnInit {

    private user: User;
    public tasks: Array<Task>;
    public editNode: any;
    public selectedTaskNode: number;
    public selectedTaskNodeRemove: number;
    public strColor: string;
    public isEdit: boolean;
    public title: string;
    public timeout: any;
    public isSaving: boolean;

    constructor(
        private _taskService: TaskService, 
        private _userService: UserService, 
        private _router: Router,
        private _sharedService: SharedService
        ) {
        this.editNode = null;
        this.selectedTaskNode = null;
        this.selectedTaskNodeRemove = null;
        this.timeout = null;
        this.title = "All task";
        this.isSaving = false;
        this.user = this._sharedService.user;
    }

    ngOnInit() {
        if(!this.user) 
            this._router.navigate([""]); // Si no hay usuario, volvemos a la ventana de Login
        
        
    }

    private getTasks() {
        this._taskService.getTasks().subscribe(
            res => {
                this.tasks = []; // Limpia la lista

                for (let t of res.tasks)
                    this.tasks.push(new Task(t._id, t.title, t.description, t.date, t.priority));
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

    public addTask() {
        let newTask: Task = new Task("id", "Title", "Description", new Date(), 1);

        this._taskService.addTask(newTask).subscribe(
            res => {
                this.getTasks();
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
        var task: any = null

        for (let i = 0; i < this.tasks.length; i++)
            if (this.tasks[i]._id == id)
                task = this.tasks[i];

        return task;
    }
}