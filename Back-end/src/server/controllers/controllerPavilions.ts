import * as express from 'express';
import bbdd from '../bbdd';
import {Pavilion} from '../models/modelPavilions';

class PavilionsController {
    public express;

    constructor () {
    }
        /*
        /v0/teams  GET     Get all the teams.
        /v0/teams  POST    Create a teams.
        /v0/teams/:team_id     GET     Get a single team.
        /v0/teams/:team_id     PUT     Update a team with new info.
        /v0/teams/:team_id     DELETE  Delete a team. 
        */
    // rutas Controller **********************************
    public contRoutes() {
		this.express = express();
        let router = express.Router();

        //pavilions
        router.route('/pavilions/:team_name')
            .get(this.infoPavilions)
            .post(this.addPavilionTeam);
            
        router.route('/pavilions/:pav_id')
            .put(this.updatePavilion)
            .delete(this.deletePavilion);

        return router;
    }

    //+++++++++++++++  PAVILIONS  ++++++++++++++++++

    private infoPavilions (req, res, next) { //sacar todos los pabellones de un equipo
        console.log('respuesta infoPavilions');
        bbdd.infoPavilions(req.params.team_name)
        .then(
            value => {
                res.json(value);
                next();
            }
        ).catch(
            err => {
                console.log('err');
                res.send(err);
                res.status(404).end();
            }
        );
    }

    private addPavilionTeam (req, res, next) { //añadir un pabellon
        console.log('respuesta addPavilionTeam');
        let pavilion = new Pavilion(0, req.body.pavilion, req.body.distance, req.params.team_name);
        //bbdd.addPavilion(req.params.team_name, req.body.pavilion, req.body.distance)
        bbdd.addPavilion(pavilion)
        .then(
            value => {
                res.json(value);
                next();
            }
        ).catch(
            err => {
                console.log('err');
                res.send(err);
                res.status(404).end();
            }
        );
    }

    private updatePavilion (req, res, next) {
        console.log('respuesta updatePavilion');
        let pavilion = new Pavilion(req.params.pav_id, req.body.pavilion, req.body.distance);        
        //bbdd.updatePavilion(req.params.pav_id, req.body.pavilion, req.body.distance)
        bbdd.updatePavilion(pavilion)
        .then(
            value => {
                res.json(value);
                next();
            }
        ).catch(
            err => {
                console.log('err');
                res.send(err);
                res.status(404).end();
            }
        );
    }

    private deletePavilion (req, res, next) {
        console.log('respuesta deletePavilion');
        let pavilion = new Pavilion(req.params.pav_id);        
        //bbdd.deletePavilion(req.params.pav_id)
        bbdd.deletePavilion(pavilion)
        .then(
            value => {
                res.json(value);
                next();
            }
        ).catch(
            err => {
                console.log('err');
                res.send(err);
                res.status(404).end();
            }
        );
    }
}

export default new PavilionsController().contRoutes();

