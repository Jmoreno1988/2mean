import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule, JsonpModule } from "@angular/http";

import { appRoutingProvider, routing } from "./app.routing";

import { AppComponent } from "./app.component";
import { SharedService } from "./services/shared.services";
import { LoginComponent } from "./components/login.component";
import { TaskListComponent } from "./components/task-list.component";
import { Log } from "./components/log.component";
import { Encrypt } from "./components/encrypt.component";

@NgModule ({
	imports: [ BrowserModule, FormsModule, HttpModule, JsonpModule, routing ],
	declarations: [ AppComponent, LoginComponent, TaskListComponent, Log, Encrypt ],
	providers: [ appRoutingProvider, SharedService ],
	bootstrap: [ AppComponent ]
})

export class AppModule {};