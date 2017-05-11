import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { User } from "../models/userModel";

@Injectable()

export class SharedService {

    public user: User;

    constructor() {
        this.user = null;
    }
}