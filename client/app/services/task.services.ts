import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { Task } from "../models/taskModel";

@Injectable()

export class TaskService {

    public url: string;

    constructor(private _http: Http) {
        this.url = "http://localhost:3688/api";
    }

    getTasks() {
        return this._http.get(this.url + "/getAllTask").map(res => res.json());
    }

    addTask(newTask: Task) {
		let json = JSON.stringify(newTask);
		let params = json;
		let headers = new Headers({
			"Content-Type": "application/json"
		});
		return this._http.post(this.url + "/saveTask", params, { headers: headers })
			.map(res => res.json());	
    }

    updateTask(task: Task) {
		let json = JSON.stringify(task);
		let params = json;
		let headers = new Headers({
			"Content-Type": "application/json"
		});
		return this._http.put(this.url + "/updateTask/" + task._id, params, { headers: headers })
			.map(res => res.json());	
    }

    deleteTask(id: string) {
        return this._http.delete(this.url + "/deleteTask/" + id).map(res => res.json());
    }

    upPriority(_id: string) {
		let headers = new Headers({
			"Content-Type": "application/json"
		});
		return this._http.put(this.url + "/upPriority/" + _id, {}, { headers: headers })
			.map(res => res.json());
    }

    downPriority(_id: string) {
		let headers = new Headers({
			"Content-Type": "application/json"
		});
		return this._http.put(this.url + "/downPriority/" + _id, {}, { headers: headers })
			.map(res => res.json());
    }
}