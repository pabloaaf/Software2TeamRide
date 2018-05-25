import * as express from 'express';
import * as bodyParser from 'body-parser';
import middleware from './server/middleware';
import controller from './server/controller';
import manager from './server/manager';

class App {
	public express: express.Aplication;

	constructor () {
		this.express = express();
		manager;
		this.express.use(bodyParser.urlencoded({ extended:false }));
		this.express.use(bodyParser.json());
		this.express.use('/v0', middleware, controller.contRoutes());
	}
}
export default new App().express;