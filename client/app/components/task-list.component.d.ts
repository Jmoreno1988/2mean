import { OnInit } from "@angular/core";
import { TaskService } from "../services/task.services";
import { Task } from "../models/taskModel";
export declare class TaskListComponent implements OnInit {
    private _taskService;
    tasks: Array<Task>;
    editNode: any;
    selectedTaskNode: number;
    selectedTaskNodeRemove: number;
    strColor: string;
    isEdit: boolean;
    title: string;
    timeout: any;
    isSaving: boolean;
    constructor(_taskService: TaskService);
    ngOnInit(): void;
    private getTasks();
    deleteTask(evt: any, id: string, i: any): void;
    addTask(): void;
    updateTask(id: string): void;
    openTask(id: string, i: number): void;
    upPriority(_id: string): void;
    downPriority(_id: string): void;
    isFinishEdition(id: string): void;
    toggleEdit(): void;
    private getColorToPriority(priority);
    private getTaskById(id);
}
