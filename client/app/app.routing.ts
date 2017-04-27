import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TaskListComponent } from "./components/task-list.component";

const appRoutes: Routes = [
	{ path: "", component: TaskListComponent },
	{ path: "**", component: TaskListComponent }
	];

export const appRoutingProvider: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);