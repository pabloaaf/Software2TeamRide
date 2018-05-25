// npm install mysql
import * as mysql from 'mysql';

class manager {
	private conexion;

	constructor() {
		this.conexion = this.crearConexion();
	}

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

	/*private crearBD() {
		this.conexion.query(';',
			function (err, result) {
				if (err) throw err;
				console.log('log bd created');
			});
	}*/
	//{name:'Cuatro Valles'}
	public añadirEquipo(name: string) {
		console.log(name);
		return new Promise((resolve, reject) => {
			this.conexion.query('INSERT INTO teams (name) VALUES (\''+ name +'\');',
				(err, result) => {
					if (err) reject(err);
					resolve(result);
				})
		});
	}

	public leerEquipos() {
		return new Promise((resolve, reject) => {
			this.conexion.query('SELECT * FROM teams;',
				function (err, result) {
					if (err) return reject(err);
					resolve(result);
				})
		});
	}

	private close() {
		return new Promise( (resolve, reject) => {
			this.conexion.end(err => {
				if(err) return reject(err);
				resolve();
			});
		})
	}
}

export default new manager();