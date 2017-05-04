import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { User } from "../models/userModel";

@Injectable()

export class UserService {

    public url: string;

    constructor(private _http: Http) {
        this.url = "http://localhost:3688/api";
    }

    getUser() {
        return {};//this._http.get(this.url + "/getAllTask").map(res => res.json());
    }
}