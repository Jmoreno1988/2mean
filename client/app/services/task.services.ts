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
        this.url = "http://localhost:3688/api";
    }

    getTasks() {
        /*
        return [
            new Task("1", "Tarea de prueba", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut mollis tellus. Ut in lorem in ipsum sollicitudin consectetur. Morbi volutpat vitae turpis quis luctus. Nullam vel pretium est. Pellentesque posuere malesuada ante, eu aliquet quam. Donec sit amet cursus metus. Sed mauris ligula, auctor eget libero quis, blandit ultrices tellus. Morbi scelerisque nunc at tellus scelerisque ultricies. Quisque laoreet lobortis faucibus. Donec vehicula blandit faucibus. Nam ac arcu et orci tincidunt ornare. Nullam id neque ut quam posuere suscipit eu a justo. Suspendisse eu est tortor. Duis ac luctus tellus. Vivamus dictum vestibulum lacus, sed tincidunt metus ullamcorper et. Curabitur egestas velit quis sem vulputate efficitur.", new Date(), 1),
            new Task("2", "Tarea de prueba 2", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut mollis tellus. Ut in lorem in ipsum sollicitudin consectetur. Morbi volutpat vitae turpis quis luctus. Nullam vel pretium est. Pellentesque posuere malesuada ante, eu aliquet quam. Donec sit amet cursus metus. Sed mauris ligula, auctor eget libero quis, blandit ultrices tellus. Morbi scelerisque nunc at tellus scelerisque ultricies. Quisque laoreet lobortis faucibus. Donec vehicula blandit faucibus. Nam ac arcu et orci tincidunt ornare. Nullam id neque ut quam posuere suscipit eu a justo. Suspendisse eu est tortor. Duis ac luctus tellus. Vivamus dictum vestibulum lacus, sed tincidunt metus ullamcorper et. Curabitur egestas velit quis sem vulputate efficitur.", new Date(), 2),
            new Task("3", "Tarea de prueba 3", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut mollis tellus. Ut in lorem in ipsum sollicitudin consectetur. Morbi volutpat vitae turpis quis luctus. Nullam vel pretium est. Pellentesque posuere malesuada ante, eu aliquet quam. Donec sit amet cursus metus. Sed mauris ligula, auctor eget libero quis, blandit ultrices tellus. Morbi scelerisque nunc at tellus scelerisque ultricies. Quisque laoreet lobortis faucibus. Donec vehicula blandit faucibus. Nam ac arcu et orci tincidunt ornare. Nullam id neque ut quam posuere suscipit eu a justo. Suspendisse eu est tortor. Duis ac luctus tellus. Vivamus dictum vestibulum lacus, sed tincidunt metus ullamcorper et. Curabitur egestas velit quis sem vulputate efficitur.", new Date(), 3),
        ]
        */
        return this._http.get(this.url + "/getAllTask").map(res => res.json());
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