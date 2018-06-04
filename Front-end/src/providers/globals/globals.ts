import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalsProvider {

  constructor() {
    console.log('Hello GlobalsProvider Provider');
  }

}
export class teams{
	name:string;
	//id: number;
	//players: players[];
	//cars: cars[];

	/*constructor(){
		this.players = new Array(new players());
		this.cars = new Array(new cars());
	}*/
}	

export class players{
	id: number;
	//team: teams;
	name: string;
	//teamId: string;
	team: string;
	nick: string;
	dorsal: number;
	email: string;
	deuda : number;
	//añadir pasword
	pasw: string;
	constructor(id:number){
		this.id = id;
	}
}

export class register{
	player:players;
	token:string;
}

export class cars{
	id:number;
	ownerID: number;
	owner:string;
	team:string;
	spendingGas:number;
	gasPrice:number;
	model:string;
	seats: number;

	constructor(id:number){
		this.id = id;
	}

}
export class pavilions{
	team: string;
	pavilion: string;
	distance: number;
	id:number;
	constructor(id:number){
		this.id = id;
	}

//crear nueva clase, relacion entre pabellon y equipo

//historic; date(string), team,pavilionId
//tripCars: date(string), team, carId
//tripPlayers: date(string), team, playerId
}
export class tripCars{
	 date:string;
	 team:string;
	 carId:number;
}
export class tripPlayers{
	 date:string;
	 team:string;
	 playerId:number;
}
export class historic{
	 date:string;
	 team:string;
	 pavilionId:number;
}