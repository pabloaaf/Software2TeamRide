import * as express from 'express';
import bbdd from '../bbdd';
import {Player} from '../models/modelPlayers';

class PlayersController {
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

        //players
        router.route('/players/:team_name')
            .get(this.infoPlayers)
            .post(this.addPlayer);

        router.route('/players/:players_id')
            .put(this.updatePlayerId)
            .delete(this.deletePlayerId);

        return router;
    }

    //+++++++++++++++++++  PLAYERS  ++++++++++++++++++

    private infoPlayers (req, res, next) {
        console.log('respuesta infoPlayers con ' + req.params.team_name);
        bbdd.infoPlayers(req.params.team_name)
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

    private addPlayer (req, res, next) {
        console.log('respuesta addPlayer con ' + req.params.team_name);
        let player = new Player(0, req.body.name, req.body.nick, req.body.dorsal, req.params.team_name)
        //bbdd.addPlayer(req.params.team_name, req.body.name, req.body.nick, req.body.dorsal)
        bbdd.addPlayer(player)
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

    private updatePlayerId (req, res, next) {
        console.log('respuesta updatePlayerId');
        let player = new Player(req.params.players_id, req.body.name, req.body.nick, req.body.dorsal)
        //bbdd.updatePlayer(req.params.players_id, req.body.name, req.body.dorsal, req.body.nick)
        bbdd.updatePlayer(player)
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

    private deletePlayerId (req, res, next) {
        console.log('respuesta deletePlayerId');
        let player = new Player(req.params.players_id)        
        //bbdd.deletePlayer(req.params.players_id)
        bbdd.deletePlayer(player)
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

export default new PlayersController().contRoutes();

