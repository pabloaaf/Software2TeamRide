import * as express from 'express'
import bbdd from './bbdd';

class BasicsController {

    constructor () {
    }

    // rutas Controller **********************************
    public contRoutes() {
        let router = express.Router();
        //registro
        router.route('/login/')
            .get(this.login)
            .post(this.register);

        // teams
        router.route('/teams/')
            .get(this.devolverTeams)
            .post(this.actualizarTeams);

        router.route('/teams/:team_id')
            .get(this.devolverTeamId)
            .put(this.actualizarTeamId)
            .delete(this.borrarTeamId);
        /*
        /v0/teams  GET     Get all the teams.
        /v0/teams  POST    Create a teams.
        /v0/teams/:team_id     GET     Get a single team.
        /v0/teams/:team_id     PUT     Update a team with new info.
        /v0/teams/:team_id     DELETE  Delete a team. 
        */

        //cars
        router.route('/cars/')
            .get(this.devolverCars)
            .post(this.actualizarCars);

        router.route('/cars/:cars_id')
            .get(this.devolverTeamId)
            .put(this.actualizarCarId)
            .delete(this.borrarCarId);
        
        //players
        router.route('/players/')
            .get(this.devolverPlayers)
            .post(this.actualizarPlayers);

        router.route('/players/:players_id')
            .get(this.devolverPlayerId)
            .put(this.actualizarPlayerId)
            .delete(this.borrarPlayerId);

        //pavilions
        router.route('/pavilions/')
            .get(this.devolverPavilions)
            .post(this.actualizarPavilions);

        router.route('/pavilions/:pavilions_id')
            .get(this.devolverPavilionId)
            .put(this.actualizarPavilionId)
            .delete(this.borrarPavilionId);

        return router;
    }

    // funciones Controller **********************************
    private login (req, res, next) {
        console.log('respuesta devolverTeamId');
        bbdd.login()
        .then(
            value => {
                res.send('Aqui se devolvera un token de loggeo');
                //bucle que busca si el usuario existe
                //ToDo
                next();
            }
        ).catch(
            err => {
                console.log('err');
                res.send('Usuario no encontrado');
                res.status(404).end();
            }
        );
    }

    private register (req, res, next) {
        console.log('respuesta devolverTeamId');
        bbdd.register()
        .then(
            value => {
                res.json('Usuario registrado');
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

    //+++++++++++++++++++  TEAM  ++++++++++++++++++

    private devolverTeams (req, res, next) {
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

    private actualizarTeams (req, res, next) {
        console.log('respuesta actualizarTeams');
        bbdd.addTeam(req.body.name)
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

    private devolverTeamId (req, res, next) {
        console.log('respuesta devolverTeamId');
        bbdd.infoTeam(req.params.id)
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


    private actualizarTeamId (req, res, next) {
        console.log('respuesta actualizarTeamId');
        bbdd.updateTeam(req.params.id, req.body.name) //pasar id y un nombre nuevo
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

    private borrarTeamId (req, res, next) {
        console.log('respuesta borrarTeamId');
        bbdd.deleteTeam(req.params.id)
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

    //+++++++++++++++++++ CAR ++++++++++++++++++++++

    private devolverCars (req, res, next) {
        console.log('respuesta devolverTeams');
        bbdd.infoCars()
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

    private actualizarCars (req, res, next) {
        console.log('respuesta actualizarTeams');
        bbdd.addCar(req.body.playerId, req.body.teamId, req.body.gas, req.body.model)
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

    private devolverCarId (req, res, next) {
        console.log('respuesta devolverTeamId');
        bbdd.infoCar(req.params.id)
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


    private actualizarCarId (req, res, next) {
        console.log('respuesta actualizarTeamId');
        bbdd.updateCar(req.params.id, req.body.playerId, req.body.teamId, req.body.gas, req.body.model)
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

    private borrarCarId (req, res, next) {
        console.log('respuesta borrarTeamId');
        bbdd.deleteCar(req.params.id)
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

    //+++++++++++++++++++  PLAYERS  ++++++++++++++++++

    private devolverPlayers (req, res, next) {
        console.log('respuesta devolverTeams');
        bbdd.infoPlayers()
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

    private actualizarPlayers (req, res, next) {
        console.log('respuesta actualizarTeams');
        bbdd.addPlayer(req.body.playerId, req.body.teamId, req.body.gas, req.body.model)
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

    private devolverPlayerId (req, res, next) {
        console.log('respuesta devolverTeamId');
        bbdd.infoPlayer(req.params.id)
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


    private actualizarPlayerId (req, res, next) {
        console.log('respuesta actualizarTeamId');
        bbdd.updatePlayer(req.params.id, req.body.playerId, req.body.teamId, req.body.gas, req.body.model)
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

    private borrarPlayerId (req, res, next) {
        console.log('respuesta borrarTeamId');
        bbdd.deletePlayer(req.params.id)
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

    //+++++++++++++++  PAVILIONS  ++++++++++++++++++

    private devolverPavilions (req, res, next) {
        console.log('respuesta devolverTeams');
        bbdd.infoPavilions()
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

        //añadir teams_pav_rel aqui
    }

    private actualizarPavilions (req, res, next) {
        console.log('respuesta actualizarTeams');
        bbdd.addPavilion(req.body.playerId, req.body.teamId, req.body.gas, req.body.model)
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

        //añadir teams_pav_rel aqui

    }

    private devolverPavilionId (req, res, next) {
        console.log('respuesta devolverTeamId');
        bbdd.infoPavilion(req.params.id)
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

        //añadir teams_pav_rel aqui
    }


    private actualizarPavilionId (req, res, next) {
        console.log('respuesta actualizarTeamId');
        bbdd.updatePavilion(req.params.id, req.body.playerId, req.body.teamId, req.body.gas, req.body.model)
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

        //añadir teams_pav_rel aqui
    }

    private borrarPavilionId (req, res, next) {
        console.log('respuesta borrarTeamId');
        bbdd.deletePavilion(req.params.id)
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

        //añadir teams_pav_rel aqui
    }
}

export default new BasicsController();

