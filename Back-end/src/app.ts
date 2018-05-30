import * as express from 'express';
import * as bodyParser from 'body-parser';
import controller from './server/controller';
import bbdd from './server/bbdd';
import * as cors from "cors";

//options for cors midddleware
const options:cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  origin: "*",
  preflightContinue: false
};

class App {
	public express;

	constructor () {
		this.express = express();
		bbdd;
		//use cors middleware
		this.express.use(cors(options));
		//enable pre-flight
		this.express.options("*", cors(options));
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