import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { Task } from "../models/taskModel";

@Injectable()

export class TaskService {
	
    public url: string;
	
    constructor(private _http: Http) {
		/*this.url = "http://localhost:3000/api";*/
		//this.url = "http://127.0.0.1:3691/api";
	}

	getTasks() {
		//return this._http.get(this.url + "/getFavorites").map(res => res.json());
	}

	getTask(id: string) {
		//return this._http.get(this.url + "/getFavorite/" + id).map(res => res.json());
	}

	addTask(favorite: Task) {
        /*
		console.log("Guardando " + favorite);
		let json = JSON.stringify(favorite);
		let params = json;
		let headers = new Headers({
			"Content-Type": "application/json"
		});
		return this._http.post(this.url + "/saveFavorite", params, { headers: headers })
			.map(res => res.json());	
            */
	}

	editTask(favorite: Task) {
        /*
		console.log("Actualizando " + favorite);
		let json = JSON.stringify(favorite);
		let params = json;
		let headers = new Headers({
			"Content-Type": "application/json"
		});
		return this._http.put(this.url + "/updateFavorite/" + favorite._id, params, { headers: headers })
			.map(res => res.json());	
            */
	}

	deleteTask(id: string) {
		//return this._http.delete(this.url + "/deleteFavorite/" + id).map(res => res.json());
	}
}