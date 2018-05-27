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

	public login() {
		return new Promise((resolve, reject) => {
			this.conexion.query(';', //cambiar
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public register() {
		return new Promise((resolve, reject) => {
			this.conexion.query(';', //cambiar
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	//+++++++++++++++  TEAM  ++++++++++++++++++

	public infoTeams() {
		return new Promise((resolve, reject) => {
			this.conexion.query('SELECT * FROM teams;',
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
			this.conexion.query('INSERT INTO teams (name) VALUES (\''+ name +'\');',
				(err, result) => {
					if (err) reject(err);
					resolve(result);
				});
		});
	}

	//id
	public infoTeam(id: number) {
		return new Promise((resolve, reject) => {
			this.conexion.query('SELECT * FROM teams WHERE name = \''+ id +'\';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	//id + {name:'Cuatro Valles'}
	public updateTeam(id: number, name: string) {
		return new Promise((resolve, reject) => {
			this.conexion.query(';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public deleteTeam(id: number) {
		return new Promise((resolve, reject) => {
			this.conexion.query(';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	//+++++++++++++++  CARS  ++++++++++++++++++

	public infoCars() {
		return new Promise((resolve, reject) => {
			this.conexion.query('SELECT * FROM cars;',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	//{name:'Cuatro Valles'}
	public addCar(playerId: number, teamId: number, gas: string, model: string) {
		console.log(name);
		return new Promise((resolve, reject) => {
			this.conexion.query('INSERT INTO cars (?) VALUES ?;',
				(err, result) => {
					if (err) reject(err);
					resolve(result);
				});
		});
	}

	//id
	public infoCar(id: number) {
		return new Promise((resolve, reject) => {
			this.conexion.query('SELECT * FROM cars WHERE id = \''+ id +'\';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	//id + {name:'Cuatro Valles'}
	public updateCar(id: number, playerId: number, name: string) {
		return new Promise((resolve, reject) => {
			this.conexion.query(';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public deleteCar(id: number) {
		return new Promise((resolve, reject) => {
			this.conexion.query(';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	//+++++++++++++++  PLAYERS  ++++++++++++++++++

	public infoPlayers() {
		return new Promise((resolve, reject) => {
			this.conexion.query('SELECT * FROM players;',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	//{name:'Cuatro Valles'}
	public addPlayer(playerId: number, teamId: number, gas: string, model: string) {
		console.log(name);
		return new Promise((resolve, reject) => {
			this.conexion.query('INSERT INTO players (?) VALUES ?;',
				(err, result) => {
					if (err) reject(err);
					resolve(result);
				});
		});
	}

	//id
	public infoPlayer(id: number) {
		return new Promise((resolve, reject) => {
			this.conexion.query('SELECT * FROM players WHERE id = \''+ id +'\';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	//id + {name:'Cuatro Valles'}
	public updatePlayer(id: number, playerId: number, name: string) {
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

	public infoPavilions() {
		return new Promise((resolve, reject) => {
			this.conexion.query('SELECT * FROM pavilions;',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	//{name:'Cuatro Valles'}
	public addPavilion(playerId: number, teamId: number, gas: string, model: string) {
		console.log(name);
		return new Promise((resolve, reject) => {
			this.conexion.query('INSERT INTO pavilions (?) VALUES ?;',
				(err, result) => {
					if (err) reject(err);
					resolve(result);
				});
		});
	}

	//id
	public infoPavilion(id: number) {
		return new Promise((resolve, reject) => {
			this.conexion.query('SELECT * FROM pavilions WHERE id = \''+ id +'\';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	//id + {name:'Cuatro Valles'}
	public updatePavilion(id: number, playerId: number, name: string) {
		return new Promise((resolve, reject) => {
			this.conexion.query(';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public deletePavilion(id: number) {
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