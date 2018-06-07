export class Pavilion{
	team: string;
	pavilion: string;
	distance: number;
	id:number;

	constructor(id:number)
	constructor(id:number, pavilion:string, distance:number)
	constructor(id:number, pavilion:string, distance:number, team:string)	
	constructor(id:number, pavilion?:string, distance?:number, team?:string){
		this.id = id;
		this.team = team;
		this.pavilion = pavilion;
		this.distance = distance;
	}

}	