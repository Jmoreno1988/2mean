import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { Task } from "../models/taskModel";
export declare class TaskService {
    private _http;
    url: string;
    constructor(_http: Http);
    getTasks(): Observable<any>;
    addTask(newTask: Task): Observable<any>;
    updateTask(task: Task): Observable<any>;
    deleteTask(id: string): Observable<any>;
    upPriority(_id: string): Observable<any>;
    downPriority(_id: string): Observable<any>;
}
