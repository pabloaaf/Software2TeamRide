import * as express from 'express';
import bbdd from '../bbdd';
import {Team} from '../models/modelTeams';

class TeamsController {
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

        // teams
        router.route('/teams/')
            .get(this.infoTeams)
            .post(this.addTeam);

        return router;
    }

    //+++++++++++++++++++  TEAM  ++++++++++++++++++

    private infoTeams (req, res, next) { //devuelve la lista de teams
        console.log('respuesta devolverTeams');
        bbdd.infoTeams()
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

    private addTeam (req, res, next) { //añade un nuevo team
        console.log('respuesta actualizarTeams');
        let team = new Team(req.body.name);
        //bbdd.addTeam(req.body.name)
        bbdd.addTeam(team)
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

export default new TeamsController().contRoutes();

