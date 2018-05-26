import * as express from 'express';
import * as bodyParser from 'body-parser';
import controller from './server/controller';
import bbdd from './server/bbdd';

class App {
	public express: express.Aplication;

	constructor () {
		this.express = express();
		bbdd;
		this.express.use(bodyParser.urlencoded({ extended:false }));
		this.express.use(bodyParser.json());
		this.express.use('/v0', controller.contRoutes());
		this.express.use('', this.pruebas);
	}

	private pruebas(req, res, next) {
		console.log(req.body);
		next();
	}
}
export default new App().express;