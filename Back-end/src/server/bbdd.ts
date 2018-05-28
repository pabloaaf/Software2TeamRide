// npm install mysql
import * as mysql from 'mysql';

class bbdd {
	private conexion;

	constructor() {
		this.conexion = this.crearConexion();
	}
	//******************* CONEXION ********************

	private crearConexion() {
		let con = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'cuatrovalles',
			database: 'db_softwareii'
		});
		con.connect(function(err) {
			if (err) throw err;
			console.log('Conected to bd');
		});
		return con;
	}

	//+++++++++++++++  USUARIOS  ++++++++++++++++++

	public login(email:string) {
		return new Promise((resolve, reject) => {
			this.conexion.query(';', //ToDO
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public checkRegisterPlayer(team:string, dorsal:number) {
		return new Promise((resolve, reject) => {
			this.conexion.query(';', //Todo
				function (err, result) {
					if (result == null || err) return reject(err); //devuelve que existe el jugador
					resolve(result); //devuelve que se query resulto vacia
				});
		});
	}

	public register(email:string, password:string) {
		return new Promise((resolve, reject) => {
			this.conexion.query(';', //Todo
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public registerNewPlayer(email:string, password:string, team:string, name:string, dorsal:number, nick:string) {
		return new Promise((resolve, reject) => {
			this.conexion.query(';', //Todo
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	//+++++++++++++++  TEAM  ++++++++++++++++++

	public infoTeams() {
		return new Promise((resolve, reject) => {
			this.conexion.query('SELECT name FROM teams;', //devolver el nombre de todos los equipos
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	//{name:'Cuatro Valles'}
	public addTeam(name: string) {
		console.log(name);
		return new Promise((resolve, reject) => {
			this.conexion.query('INSERT INTO teams (name) VALUES (\''+ name +'\');', //añade un nuevo team
				(err, result) => {
					if (err) reject(err);
					resolve(result);
				});
		});
	}

	//id
	public infoTeam(team: string) { //Devolver jugadores de ese equipo
		return new Promise((resolve, reject) => {
			this.conexion.query('SELECT * FROM players WHERE team = \''+ team +'\';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	//id + {name:'Cuatro Valles'} 
	public updateTeam(oldName: string, newName: string) {
		return new Promise((resolve, reject) => {
			this.conexion.query('UPDATE teams SET name=\''+ newName +'\' WHERE name=\''+oldName+'\';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public deleteTeam(name: string) {//mejor con nombre 
		return new Promise((resolve, reject) => {
			this.conexion.query('DELETE FROM teams WHERE id=\''+name+'\';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	//+++++++++++++++  CARS  ++++++++++++++++++

	public infoCars(team:string) { //supongo que será sacar una lista de los coches de cierto equipo
		return new Promise((resolve, reject) => { //ToDo
			this.conexion.query('SELECT id, owner, model, seats FROM cars WHERE team=\''+team+'\';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public addCar(team: string, owner: string, ownerId: number, spendingGas: string, model: string, seats:number) {
		console.log(name);
		return new Promise((resolve, reject) => {
			this.conexion.query('INSERT INTO cars (team, owner, ownerId, spendingGas, model, seats) VALUES (\''+ team +'\', \''+ owner +'\', \''+ ownerId +'\', \''+ spendingGas +'\', \''+ model +'\', \''+seats+'\');',
				(err, result) => {
					if (err) reject(err);
					resolve(result);
				});
		});
	}

	public infoCarId(id: number) { //Y aquí la información de un coche en concreto
		return new Promise((resolve, reject) => {
			this.conexion.query('SELECT * FROM cars WHERE id = \''+ id +'\';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public updateCarId(id: number, owner: string, ownerId: number, spendingGas:number) {//no sé
		return new Promise((resolve, reject) => {
			this.conexion.query(';', //ToDo
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public deleteCarId(id: number) {
		return new Promise((resolve, reject) => {
			this.conexion.query('DELETE FROM cars WHERE id= \''+ id +'\';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	//+++++++++++++++  PLAYERS  ++++++++++++++++++

	public infoPlayers(team:string) {
		return new Promise((resolve, reject) => {
			this.conexion.query('SELECT * FROM players WHERE team= \''+team+'\';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

/*	public playerIDfromEmail(email:string) { //seleccionar el id de un jugador basándonos en su email
		return new Promise((resolve, reject) => {
			this.conexion.query('SELECT id FROM players WHERE email=\''+email+'\';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public selectTeam(id:number) { //seleccionar equipo de un jugador
		return new Promise((resolve, reject) => {
			this.conexion.query('SELECT team FROM players WHERE id=\''+id+'\';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}
*/
	public addPlayer(team: string, name: string, dorsal: number, nick: string) { //agregar un jugador, que no esta registrado
		console.log(name);
		return new Promise((resolve, reject) => {
			this.conexion.query('INSERT INTO players (team, name, nick, debt) VALUES (\''+ team +'\', \''+ name +'\', \''+ nick +'\', \''+ debt +'\');',
				(err, result) => {
					if (err) reject(err);
					resolve(result);
				});
		});
	}

	public infoPlayer(id: number) {
		return new Promise((resolve, reject) => {
			this.conexion.query('SELECT * FROM players WHERE id = \''+ id +'\';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public updatePlayer(id: number, name: string, dorsal: number, nick: string) {
		return new Promise((resolve, reject) => {
			this.conexion.query(';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public deletePlayer(id: number) {
		return new Promise((resolve, reject) => {
			this.conexion.query(';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	//+++++++++++++++  PAVILIONS  ++++++++++++++++++

	public infoPavilions(team: string) {
		return new Promise((resolve, reject) => {
			this.conexion.query('SELECT * FROM pavilions;',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public addPavilion(team: string, pavilion: string, distance: number) {
		console.log(name);
		return new Promise((resolve, reject) => {
			this.conexion.query('INSERT INTO pavilions (?) VALUES ?;',
				(err, result) => {
					if (err) reject(err);
					resolve(result);
				});
		});
	}

	public updatePavilion(team: string, pavilion: string, distance: number) {
		return new Promise((resolve, reject) => {
			this.conexion.query(';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public deletePavilion(team: string, pavilion: string) {
		return new Promise((resolve, reject) => {
			this.conexion.query(';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	//+++++++++++++++  CERRAR  ++++++++++++++++++

	private close() {
		return new Promise( (resolve, reject) => {
			this.conexion.end(err => {
				if(err) return reject(err);
				resolve();
			});
		});
	}
}

export default new bbdd();