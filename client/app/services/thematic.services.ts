import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { Thematic } from "../models/thematicModel";

@Injectable()

export class ThematicService {

    public url: string;

    constructor(private _http: Http) {
        this.url = "http://localhost:3688/api";
    }

    createThematic(newThematic: Thematic) {
		let json = JSON.stringify(newThematic);
		let params = json;
		let headers = new Headers({
			"Content-Type": "application/json"
		});
        console.log(newThematic)
		return this._http.post(this.url + "/saveThematic", params, { headers: headers })
			.map(res => res.json());	
    }
}