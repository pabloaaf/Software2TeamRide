import * as express from 'express';
import * as bodyParser from 'body-parser';
import contCars from './server/controllers/controllerCars';
import contHistoric from './server/controllers/controllerHistoric';
import contLogReg from './server/controllers/controllerLogReg';
import contPlayers from './server/controllers/controllerPlayers';
import contTeams from './server/controllers/controllerTeams';
import contPavilions from './server/controllers/controllerPavilions';
import bbdd from './server/bbdd';
import * as cors from "cors";

//options for cors midddleware
const options:cors.CorsOptions = {
  allowedHeaders: ["Origin", "X-Requested-With", "X-Requested-By", "Content-Type", "Accept", "X-Access-Token","Access-Control-Allow-Origin"],
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS,HEAD,PATCH",
  origin: "*",
  preflightContinue: true
};

class App {
	public express;

	constructor () {
		this.express = express();
		bbdd;
		//use cors middleware
		this.express.use(cors(options));//options
		//enable pre-flight
		this.express.options("*", cors(options));
		this.express.use(bodyParser.urlencoded({ extended:false }));
		this.express.use(bodyParser.json());
		this.express.use('/v0', contCars, contHistoric, contLogReg, contPlayers, contTeams, contPavilions);
	}
}
export default new App().express;