import { Component, OnInit } from "@angular/core";
import { TaskService } from "../services/task.services";
import { Task } from "../models/taskModel";
import { Route, ActivatedRoute, Params } from "@angular/router";

@Component({
	selector: "task-list",
	templateUrl: "./app/views/task-list.html",
	providers: [ TaskService ]
})

export class TaskListComponent implements OnInit {
	

	constructor(private _taskService: TaskService) {
		
	}

	ngOnInit() {
		
	}
}