export class Car{
	id:number;
	ownerID: number;
	owner:string;
	team:string;
	spendingGas:number;
	gasPrice:number;
	model:string;
	seats: number;

	//constructores sobrecargados
	constructor(id:number, spendingGas:number, gasPrice:number, model:string, seats:number, ownerId:number, owner:string, team:string)
	constructor(id:number, spendingGas:number, gasPrice:number, model:string, seats:number)
	constructor(id:number)
	constructor(id:number, spendingGas?:number, gasPrice?:number, model?:string, seats?:number, ownerId?:number, owner?:string, team?:string){
		this.id = id;
		this.ownerID = ownerId;
		this.owner = owner;
		this.team = team;
		this.spendingGas = spendingGas;
		this.gasPrice = gasPrice;
		this.model = model;
		this.seats = seats;

	}
	
}