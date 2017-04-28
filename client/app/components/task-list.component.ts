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

    constructor(private _taskService: TaskService) {
        this.editNode = null;
        this.selectedTaskNode = null;
        this.show = false; 
    }

    ngOnInit() {
        this.tasks = this.getTasks();
    }

    private getTasks(): Array<Task> {
        return this._taskService.getTasks();
    }

    public activateEditMode(id: string, i: number) {
        if(this.editNode != id) {
            this.editNode = id;
            this.selectedTaskNode = i;
        } else {
            this.editNode = null;
            this.selectedTaskNode = null;
        }

        this.show = false;
    }

    public removeTask(id:string) {
        for(let i = 0; i < this.tasks.length; i++) 
            if(this.tasks[i]._id == id)
                this.tasks.splice(i, 1);
    }
}