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
        router.route('/cars/:team_name')
            .get(this.infoCars)
            .post(this.addCar);

        router.route('/cars/:cars_id')
            .put(this.updateCarId)
            .delete(this.deleteCarId);

        //players
        router.route('/players/:team_name')
            .get(this.infoPlayers)
            .post(this.addPlayer);

        router.route('/players/:players_id')
            .put(this.updatePlayerId)
            .delete(this.deletePlayerId);

        //pavilions
        router.route('/pavilions/:team_name')
            .get(this.infoPavilions)
            .post(this.addPavilionTeam);
            
        router.route('/pavilions/:pav_id')
            .put(this.updatePavilion)
            .delete(this.deletePavilion);

        //cambiar deudas
        router.route('/debt/:player_id')
         	.put(this.updatePlayerDebtId);

        //Historico + auxiliar de coches
        router.route('/historic/:team_name')
             .get(this.historic);

        return router;
    }

    // funciones Controller **********************************
    private login (req, res, next) {
        console.log('respuesta login'); 
        const player = this.loginData(req.body.email, req.body.password);

        if(!player){
            res.json(player);
        }else{
            res.status(404);
        }
    }

    private register (req, res, next) {
        console.log('respuesta register');
        //devolver jugador que se ha registrado y la cookie
        bbdd.checkRegisterPlayer(req.body.team, req.body.dorsal)
        .then(
            value => {
                if(!value){ //Hay player, hacer update

		            bbdd.register(req.body.team, req.body.dorsal,req.body.email, req.body.password)
    		        .then(
    		            value => {
    		                this.loginData(req.body.email, req.body.password);
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

                }else{//vacío, haccer insert
                    bbdd.registerNewPlayer(req.body.email, req.body.password, req.body.team, req.body.name, req.body.dorsal, req.body.nick)
    		        .then(
    		            value => {
    		                this.loginData(req.body.email, req.body.password);
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

            }
        ).catch(
            err => {
                console.log('err');
                res.send(err);
                res.status(404).end();
            }
        );
    }

    private loginData(email:string, password:string) {
    	bbdd.login(email, password)
        .then(
            value => {
            	if(!value){ //existe player
                    return value;
                }else{
                    return null;
                }
            }
        ).catch(
            err => {
                console.log('err');
                //res.send('Usuario no encontrado');
                //res.status(404).end();
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
        bbdd.addPlayer(req.params.team_name, req.body.name, req.body.dorsal, req.body.nick)
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

    private updatePlayerDebtId (req, res, next) { //ToDo
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
        bbdd.addPavilion(req.params.team_name, req.body.pavilion, req.body.distance)
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
        bbdd.updatePavilion(req.params.pav_id, req.body.pavilion, req.body.distance)
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
        bbdd.deletePavilion(req.params.pav_id)
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

//+++++++++++++++++++  HISTORIC  ++++++++++++++++++

    private historic (req, res, next) { //ToDo
        console.log('respuesta historic con ' + req.params.team_name);
        bbdd.historic(req.params.team_name)
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

