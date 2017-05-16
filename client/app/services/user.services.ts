import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { User } from "../models/userModel";

@Injectable()

export class UserService {

    private url: string;
    private user: User;

    constructor(private _http: Http) {
        this.url = "http://localhost:3688/api";
        this.user = null;
    }

    loginUser(userLogin: any) {
        let json = JSON.stringify(userLogin);
        let params = json;
        let headers = new Headers({
            "Content-Type": "application/json"
        });
        
        return this._http.post(this.url + "/getAllInfoUser", params, { headers: headers })
            .map(res => res.json());
    }

    createUser(userInfo: any) {
        let json = JSON.stringify(userInfo);
        let params = json;
        let headers = new Headers({
            "Content-Type": "application/json"
        });
        return this._http.post(this.url + "/saveUser", params, { headers: headers })
            .map(res => res.json());
    }

    getAllIInfoUser(id: string) {
        return this._http.get(this.url + "/getAllTask/" + id).map(res => res.json());
    }

    setUser(user: User) {
        this.user = user;
    }

    getUser() {
        return this.user;
    }
}