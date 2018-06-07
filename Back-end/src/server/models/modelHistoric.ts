export class TripCars{
	 date:string;
	 team:string;
	 carId:number;

	 constructor(team:string, date:string)
	 constructor(team:string, date:string, carId:number)
	 constructor(date:string, team:string, carId?:number){
		 this.date = date;
		 this.team = team;
		 this.carId = carId;
	 }
}
export class TripPlayers{
	 date:string;
	 team:string;
	 playerId:number;

	 constructor(team:string, date:string)
	 constructor(team:string, date:string, playerId:number)
	 constructor(date:string, team:string, playerId?:number){
		this.date = date;
		this.team = team;
		this.playerId = playerId;
	}
}
export class Historic{
	 date:string;
	 team:string;
	 pavilionId:number;

	constructor(team:string)
	constructor(team:string, date:string, pavilionId:number)
	constructor(team:string, date?:string, pavilionId?:number){
		this.date = date;
		this.team = team;
		this.pavilionId = pavilionId;
	}
}