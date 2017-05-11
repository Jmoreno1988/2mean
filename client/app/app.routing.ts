import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginComponent } from "./components/login.component";
import { TaskListComponent } from "./components/task-list.component";

const appRoutes: Routes = [
	{ path: "", component: LoginComponent },
	{ path: "taskList", component: TaskListComponent },
	{ path: "**", component: LoginComponent }
];

export const appRoutingProvider: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);