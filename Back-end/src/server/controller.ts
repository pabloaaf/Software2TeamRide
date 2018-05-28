import * as express from 'express'
import bbdd from './bbdd';

class BasicsController {

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
        let router = express.Router();
        //registro
        router.route('/login/')
            .get(this.login)
            .post(this.register);

        // teams
        router.route('/teams/')
            .get(this.infoTeams)
            .post(this.addTeam)
            .put(this.updateTeam)
            .delete(this.deleteTeam);

        //cars
        router.route('/cars/')
            .get(this.infoCars)
            .post(this.addCar);

        router.route('/cars/:cars_id')
            .get(this.infoCarId)
            .put(this.updateCarId)
            .delete(this.deleteCarId);

        //players
        router.route('/players/')
            .get(this.infoPlayers)
            .post(this.addPlayer);

        router.route('/players/:players_id')
            .get(this.infoPlayerId)
            .put(this.updatePlayerId)
            .delete(this.deletePlayerId);

        //pavilions
        router.route('/pavilions/')
            .get(this.infoPavilions)
            .post(this.addPavilionTeam)
            .put(this.updatePavilion)
            .delete(this.deletePavilion);

        //cambiar deudas
        router.route('/debt/:player_id')
         	.put(updatePlayerDebtId);

        return router;
    }

    // funciones Controller **********************************
    private login (req, res, next) {
        console.log('respuesta login'); 
        this.loginData(res.body.email, res.body.password);
    }

    private register (req, res, next) {
        console.log('respuesta register');
        //devolver jugador que se ha registrado y la cookie
        bbdd.checkRegisterPlayer(res.body.team, res.body.dorsal)
        .then(
            value => {
		        bbdd.register(res.body.email, res.body.password)
		        .then(
		            value => {
		                this.loginData(res.body.email, res.body.password);
		                //res.json({message:'Usuario registrado'});
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
        ).catch(
            err => {
                bbdd.registerNewPlayer(res.body.email, res.body.password, res.body.team, req.body.name, req.body.dorsal, req.body.nick)
		        .then(
		            value => {
		                this.loginData(res.body.email, res.body.password);
		                //res.json({message:'Usuario registrado'});
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
        );
    }

    private loginData(email:string, password:string) {
    	bbdd.login(email)
        .then(
            value => {
            	//ToDo if de comprobar la contraseña
            	//ToDo al hacer login devolver jugador que se ha registrado
                res.send('Aqui se devolvera un cookie y el jugador completo de loggeo');
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

    private updateTeam (req, res, next) { //pasar nombre y un nombre nuevo para actualizarlo 
    	//todo los jugadores del equipo lo actualizaran en cascada
        console.log('respuesta actualizarTeamId');
        bbdd.updateTeam(req.body.name, req.body.newName)
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

    private deleteTeam (req, res, next) { // pasa nombre y se borra
    	//si el equipo tiene jugadores no se puede borrar
        console.log('respuesta borrarTeamId');
        bbdd.deleteTeam(req.body.name)
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

    private infoCars (req, res, next) { //lista de coches pertenecientes a un equipo
        console.log('respuesta infoCars');
        bbdd.infoCars(req.body.team)
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

    private addCar (req, res, next) { //añadir coche a team
        console.log('respuesta addCar');
        bbdd.addCar(req.body.team, req.body.owner, req.body.ownerId, req.body.spendingGas, req.body.model, req.body.seats)
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

    private infoCarId (req, res, next) {
        console.log('respuesta infoCarId');
        bbdd.infoCarId(req.params.id)
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


    private updateCarId (req, res, next) {
        console.log('respuesta updateCarId');
        bbdd.updateCarId(req.params.id, req.body.owner, req.body.ownerId, req.body.spendingGas) //controlar que los tres parametros existan
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

    private deleteCarId (req, res, next) {
        console.log('respuesta deleteCarId');
        bbdd.deleteCarId(req.params.id)
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

    private infoPlayers (req, res, next) {
        console.log('respuesta infoPlayers');
        bbdd.infoPlayers(req.body.team)
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
        console.log('respuesta addPlayer');
        bbdd.addPlayer(req.body.team, req.body.name, req.body.dorsal, req.body.nick)//todo
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

    private infoPlayerId (req, res, next) { //info un solo jugador
        console.log('respuesta infoPlayerId');
        bbdd.infoPlayer(req.params.id)
        .then(
            value => {
            	//por seguridad se comprueba que el jugador pertenezca al equipo que lo pide req.body.team
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
        bbdd.updatePlayer(req.params.id, req.body.nombre, req.body.dorsal, req.body.nick)
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

    private updatePlayerDebtId (req, res, next) {
    	console.log('respuesta updatePlayerDebtId');
    	//pasar por body req.body.newDebt
    	res.status(404).end();
    }

    private deletePlayerId (req, res, next) {
        console.log('respuesta deletePlayerId');
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

    private infoPavilions (req, res, next) { //sacar todos los pabellones de un equipo
        console.log('respuesta infoPavilions');
        bbdd.infoPavilions(req.body.team)
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
        bbdd.addPavilion(req.body.team, req.body.pavilion, req.body.distance)
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
        bbdd.updatePavilion(req.body.team, req.body.pavilion, req.body.distance)
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
        bbdd.deletePavilion(req.body.team, req.body.pavilion)
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

export default new BasicsController();

