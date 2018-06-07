export class Player{
	id: number;
	name: string;
	team: string;
	nick: string;
	dorsal: number;
	deuda : number;
	email: string;
	password: string;

	constructor(id: number)
	constructor(id: number, name: string, nick: string, dorsal: number, team: string)
	constructor(id: number, name: string, nick: string, dorsal: number)	
	constructor(id: number, name: string, nick: string, dorsal: number, team: string, email: string, password: string)
	constructor(id: number, name?: string, nick?: string, dorsal?: number, team?: string, email?: string, password?: string){
		this.deuda = 0;
		this.id = id;
		this.name = name;
		this.team = team;
		this.nick = nick;
		this.dorsal = dorsal;
		this.email = email;
		this.password = password;

	}

}