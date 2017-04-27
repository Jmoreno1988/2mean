import { Component } from "@angular/core";

@Component ({
	selector: "my-app",
	templateUrl: "app/views/home.html"
})

export class AppComponent {
	
	public title: string;
	public description: string;
	public boton: HTMLButtonElement;
	
	constructor() {}
};