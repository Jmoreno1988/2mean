import { Component, OnInit } from "@angular/core";
import { TaskService } from "../services/task.services";
import { Task } from "../models/taskModel";
import { Route, ActivatedRoute, Params } from "@angular/router";

@Component({
    selector: "task-list",
    templateUrl: "./app/views/task-list.html",
    providers: [TaskService],
    styleUrls: ["./app/assets/css/task-list.styles.css"]
})

export class TaskListComponent implements OnInit {

    public tasks: Array<Task>;
    public editNode: any;
    public show: boolean;
    public selectedTaskNode: number;
    public strColor:string; 
    public isEdit: boolean;
    public title: string;

    constructor(private _taskService: TaskService) {
        this.editNode = null;
        this.selectedTaskNode = null;
        this.show = false; 
        this.title = "All task";
    }

    ngOnInit() {
        this.tasks = this.getTasks();
    }

    private getTasks(): Array<Task> {
        this._taskService.getTasks().subscribe(
            res => {
                this.tasks = [];

                for (let t of res.tasks) {
			        this.tasks.push(new Task(t._id, t.title, t.description, t.date, t.priority));
                }
            },
            err => {
                console.log("Error al recibir las tareas del servidor")
                console.log(err)
            })
        return [];//;
    }

    public openTask(id: string, i: number) {
        if(this.editNode != id) {
            this.editNode = id;
            this.selectedTaskNode = i;
        }/* else {
            this.editNode = null;
            this.selectedTaskNode = null;
        }*/

        this.show = false;
    }

    public deleteTask(id:string) {
        this._taskService.deleteTask(id).subscribe(
            res => {
                this.getTasks();
            },
            err => {
                console.log("Error al borrar tarea del servidor.")
                console.log(err)
            })

        this.editNode = null;
        this.selectedTaskNode = null;
    }

    public addTask() {
        this.tasks.unshift(new Task(this.tasks.length.toString(), "Title", "Description...", new Date(), 1));
    }

    public toggleEdit() {
        this.isEdit ? this.isEdit = false : this.isEdit = true; 
    }

    private getColorToPriority(priority: number) {
        let strColor = "";
        switch(priority) {
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

    public changePriority(newPriority: number, id: string) {
        var task = this.getTaskById(id);

        if(task)
            task.priority = newPriority;
    }

    private getTaskById(id:string):Task {
        var task:any = null
        
        for(let i = 0; i < this.tasks.length; i++) 
            if(this.tasks[i]._id == id)
                task = this.tasks[i];
        
        return task;
    }

    public upPriority(_id: string) {
        this._taskService.upPriority(_id).subscribe(
            res => {
                this.getTasks();
            },
            err => {
                console.log("Error al subir prioridad de la tarea.")
                console.log(err)
            });
        this.getTasks();
    }

    public downPriority(_id: string) {
        this._taskService.downPriority(_id).subscribe(
            res => {
                this.getTasks();
            },
            err => {
                console.log("Error al bajar prioridad de la tarea.")
                console.log(err)
            });
        this.getTasks();
    }
}