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
	teamID:number;
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
	teamId: string;
	team: string;
	nick: string;
	dorsal: number;
	email: string;
	deuda : number;
	//añadir pasword
//pasw
	
}

export class cars{
	id:number;
	ownerID: number;
	owner:string;
	teamID:number;
	team:string;
	spendingGas:number;
	model:string;


}
export class Pabellones{
	distance:number;
	name:string;

	constructor(){
	}

//crear nueva clase, relacion entre pabellon y equipo
}