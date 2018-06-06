// npm install mysql
import * as mysql from 'mysql';

class bbdd {
	private conexion;

	constructor() {
		this.conexion = this.crearConexion();
	}

	//******************* TOKEN ********************

	public verifyUniqueToken(token: string) {
		return new Promise((resolve, reject) => {
			this.conexion.query('SELECT * FROM tokens WHERE token = "'+token+'";', 
				function (err, result) {
					if (err) return reject(err);
					console.log(result);
					if(result == "") {
						resolve(true);
					} else {
						resolve(false);
					}
				});
		});
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

	public login(email:string, password:string) {
		return new Promise((resolve, reject) => {
			this.conexion.query('SELECT * FROM players WHERE email = "'+email+'" AND password = "'+password+'";', 
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public checkRegisterPlayer(team:string, dorsal:number) {
		return new Promise((resolve, reject) => {
			this.conexion.query('SELECT * FROM players WHERE team = "'+team+'" AND dorsal = '+dorsal+'";',
				function (err, result) {
					if (result == null || err) return reject(err); //devuelve que existe el jugador
					resolve(result); //devuelve que se query resulto vacia
				});
		});
	}

	public register(team:string, dorsal:number, email:string, password:string) {//update jugador existente
		return new Promise((resolve, reject) => {
			this.conexion.query('UPDATE players SET email = "'+email+'", password = "'+password+'" WHERE team = "'+team+'" AND dorsal = '+dorsal+'";',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public registerNewPlayer(email:string, password:string, team:string, name:string, dorsal:number, nick:string) {//crear nuevo player
		return new Promise((resolve, reject) => {
			this.conexion.query('INSERT INTO players (team, name, nick, debt, email, password) VALUES (\''+ team +'\', \''+ name +'\', \''+ nick +'\', \''+ dorsal +'\', \'0\', \''+ email +'\', \''+ password +'\');', 
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

	public infoTeam(team: string) { //Devolver jugadores de ese equipo
		return new Promise((resolve, reject) => {
			this.conexion.query('SELECT * FROM players WHERE team = \''+ team +'\';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	/*public updateTeam(oldName: string, newName: string) {
		return new Promise((resolve, reject) => {
			this.conexion.query('UPDATE teams SET name=\''+ newName +'\' WHERE name=\''+oldName+'\';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}*/

	//+++++++++++++++  CARS  ++++++++++++++++++

	public infoCars(team:string) { //supongo que será sacar una lista de los coches de cierto equipo
		return new Promise((resolve, reject) => { //ToDo
			this.conexion.query('SELECT * FROM cars WHERE team=\''+team+'\';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public addCar(ownerId: number, owner: string, team: string, spendingGas: string, gasPrice:string, model: string, seats:number) {
		return new Promise((resolve, reject) => {
			this.conexion.query('INSERT INTO cars (ownerId, owner, team, spendingGas,gasPrice, model, seats) VALUES (\''+ ownerId +'\', \''+ owner +'\', \''+ team +'\', \''+ spendingGas +'\', \''+gasPrice+'\', \''+ model +'\', \''+seats+'\');',
				(err, result) => {
					if (err) reject(err);
					resolve(result);
				});
		});
	}

	public updateCarId(id: number, spendingGas:number, gasPrice:string, model:string, seats:string) {
		return new Promise((resolve, reject) => {
			this.conexion.query('UPDATE cars SET spendingGas=\''+spendingGas+'\', gasPrice=\''+gasPrice+'\', model=\''+model+'\', seats=\''+seats+'\' WHERE id = '+id+';', 
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

	public getInfoCarId(id: number) {
		return new Promise((resolve, reject) => {
			this.conexion.query('SELECT * FROM cars WHERE id= \''+ id +'\';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}
	


	//+++++++++++++++  PLAYERS  ++++++++++++++++++

	public infoPlayers(team:string) {
		return new Promise((resolve, reject) => {
			if(team == "") return reject("No se especifica el equipo");
			this.conexion.query('SELECT * FROM players WHERE team= \''+team+'\';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public addPlayer(team: string, name: string, nick: string, dorsal: number) { //agregar un jugador, que no esta registrado
		console.log(name);
		return new Promise((resolve, reject) => {
			this.conexion.query('INSERT INTO players (team, name, nick, dorsal, debt) VALUES (\''+ team +'\', \''+ name +'\', \''+ nick +'\', \''+ dorsal +'\', \'0\');',
				(err, result) => {
					if (err) reject(err);
					resolve(result);
				});
		});
	}

	public updatePlayer(id: number, name: string, dorsal: number, nick: string) {
		return new Promise((resolve, reject) => {
			this.conexion.query('UPDATE players SET name=\''+name+'\', dorsal='+dorsal+', nick=\''+nick+'\' WHERE id = '+id+';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public deletePlayer(id: number) {
		return new Promise((resolve, reject) => {
			this.conexion.query('DELETE FROM players WHERE id= \''+ id +'\';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public getPlayerId(id:number){
		return new Promise((resolve, reject) => {
			this.conexion.query('SELECT * FROM players WHERE id= \''+id+'\';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});

	}

	//+++++++++++++++  PAVILIONS  ++++++++++++++++++

	public infoPavilions(team: string) {
		return new Promise((resolve, reject) => {
			this.conexion.query('SELECT * FROM pavilions WHERE team = \''+ team +'\';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public addPavilion(team: string, pavilion: string, distance: number) {
		console.log(pavilion);
		return new Promise((resolve, reject) => {
			this.conexion.query('INSERT INTO pavilions (team, pavilion, distance) VALUES (\''+ team +'\', \''+ pavilion +'\', \''+ distance +'\');', 
				(err, result) => {
					if (err) reject(err);
					resolve(result);
				});
		});
	}

	public updatePavilion(id:number, pavilion: string, distance: number) {
		return new Promise((resolve, reject) => {
			this.conexion.query('UPDATE pavilions SET pavilion=\''+ pavilion +'\', distance=\''+ distance +'\' WHERE id=\''+id+'\';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public deletePavilion(id:number) {
		return new Promise((resolve, reject) => {
			this.conexion.query('DELETE FROM pavilions WHERE id= \''+ id +'\';',
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


	//+++++++++++++++  HISTORIC  ++++++++++++++++++


	public addHistoric(team:string, pavilionId:string, date:string) {
		return new Promise((resolve, reject) => {
			if(team == "") return reject("No se especifica el equipo");
			this.conexion.query('INSERT INTO historic (date, team, pavilionId) VALUES (\''+ date +'\', \''+ team +'\', \''+ pavilionId +'\' );',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public addTripCar(date:string, team:string, carId:number) {
		return new Promise((resolve, reject) => {
				this.conexion.query('INSERT INTO tripCars (date, team, carId) VALUES (\''+ date +'\', \''+ team +'\', \''+ carId +'\');',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}
	public addTripPlayer(date:string, team:string, playerId:number) {
		return new Promise((resolve, reject) => {
				this.conexion.query('INSERT INTO tripPlayers (date, team, playerId) VALUES (\''+ date +'\', \''+ team +'\', \''+ playerId +'\');',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	
	public getHistoric(team:string, numData:number) {
		return new Promise((resolve, reject) => {
			if(team == "") return reject("No se especifica el equipo");
			this.conexion.query('SELECT * FROM historic WHERE team = \''+team+'\' ORDER BY date DESC LIMIT '+numData+';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public getTripCars(team:string, date:string) {
		return new Promise((resolve, reject) => {
			if(team == "" || date == "" ) return reject("No se especifica el equipo o la fecha");
			this.conexion.query('SELECT * FROM tripCars WHERE team = \''+team+'\' AND date="'+date+'";',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public getTripPlayers(team:string, date:string) {
		return new Promise((resolve, reject) => {
			if(team == "" || date == "" ) return reject("No se especifica el equipo o la fecha");
			this.conexion.query('SELECT * FROM tripPlayers WHERE team = \''+team+'\' AND date="'+date+'";',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}


	//++++++++++++++++ DEBT +++++++++++++++++++
	
	public updatePlayerDebt(playerId:number, debt:number){
		return new Promise((resolve, reject) => {
			this.conexion.query('UPDATE FROM playerts SET debt = "'+debt+'" WHERE id= \''+playerId+'\';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}

	public getPlayerDebt(playerId:number){
		return new Promise((resolve, reject) => {
			this.conexion.query('SELECT debt FROM players WHERE id= \''+playerId+'\';',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				});
		});
	}
}
export default new bbdd();