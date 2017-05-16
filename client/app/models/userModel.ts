import { Task } from "./taskModel";
import { Thematic } from "./thematicModel";

export class User {
	constructor(
		public _id: string,
		public name: string,
		public thematics: Array<Thematic>,
		public tasks: Array<Task>,
		public token: string
	) {}
} 