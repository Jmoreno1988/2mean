export class Task {
	constructor(
        public _id: string,
		public title: string, 
		public description: string, 
        public date: Date,
        public priority: number,
		public thematicId: string
	) {}
}