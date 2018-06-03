import * as express from 'express'
import * as uuidRand from 'uuid/v4'
import bbdd from './bbdd';
import * as moment from 'moment';

class BasicsController {
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
        //registro
        router.route('/login/')
            .post(this.login)

        router.route('/register/')
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
             .put(this.updatePlayerDebt);
<<<<<<< HEAD

        //Historico 
        router.route('/historic/:team_name/:numData')
             .get(this.getHistoric)
             .post(this.addHistoric);

        //auxiliares historico
        router.route('/tripCars/:team_name/:date')
             .get(this.getTripCars);

        router.route('/tripPlayers/:team_name/:date')
             .get(this.getTripPlayers);

=======

        //Historico + auxiliar de coches
        router.route('/historic/:team_name')
             .get(this.getHistoric)
             .post(this.addHistoric);
>>>>>>> 7d320e018458c01eb4660b64c65ad1e80b77d45c

        return router;
    }

    // funciones Controller **********************************
    /*private calcNewToken() {
        let token:string = '';
        do {
            token = uuidRand();
        } while (!bbdd.verifyUniqueToken(token));
        return token;
    }*/

    //login *************************************************
    private login (req, res, next) {
        console.log('respuesta login'); 
        bbdd.login(req.body.email, req.body.password).then(
            value => {
                console.log(value);
<<<<<<< HEAD
                if(Object.keys(value).length != 0){ //existe player
=======
                if(value === []){ //existe player
>>>>>>> 7d320e018458c01eb4660b64c65ad1e80b77d45c
                    let token:string = '';
                    do {
                        token = uuidRand();
                    } while (!bbdd.verifyUniqueToken(token));
                    res.json({player:value[0],token:token});
                }else{
                    res.status(404).end();
                }
            }
        ).catch(
            err => {
                console.log(err);
                //res.send('Usuario no encontrado');
                res.status(404).end();
            }
        );
        //ToDo comparar la cookie con las anteriores
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
    		                bbdd.login(req.body.email, req.body.password).then(
                                value => {
<<<<<<< HEAD
                                    if(Object.keys(value).length != 0){ //existe player
=======
                                    if(value){ //existe player
>>>>>>> 7d320e018458c01eb4660b64c65ad1e80b77d45c
                                        let token:string = '';
                                        do {
                                            token = uuidRand();
                                        } while (!bbdd.verifyUniqueToken(token));
                                        res.json({player:value,token:token});
                                    }else{
                                        res.status(404).end();
                                    }
                                }
                            ).catch(
                                err => {
                                    console.log('err');
                                    //res.send('Usuario no encontrado');
                                    res.status(404).end();
                                }
                            );
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
                } else {//vacío, haccer insert
                    bbdd.registerNewPlayer(req.body.email, req.body.password, req.body.team, req.body.name, req.body.dorsal, req.body.nick)
    		        .then(
    		            value => {
                            bbdd.login(req.body.email, req.body.password).then(
                                value => {
<<<<<<< HEAD
                                    if(Object.keys(value).length != 0){ //existe player
=======
                                    if(value){ //existe player
>>>>>>> 7d320e018458c01eb4660b64c65ad1e80b77d45c
                                        let token:string = '';
                                        do {
                                            token = uuidRand();
                                        } while (!bbdd.verifyUniqueToken(token));
                                        res.json({player:value,token:token});
                                    }else{
                                        res.status(404).end();
                                    }
                                }
                            ).catch(
                                err => {
                                    console.log('err');
                                    //res.send('Usuario no encontrado');
                                    res.status(404).end();
                                }
                            );    		                
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
        bbdd.infoCars(req.params.team_name)
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
<<<<<<< HEAD

        bbdd.addCar(req.params.team_name, req.body.owner, req.body.ownerId, req.body.spendingGas,req.body.gasPrice, req.body.model, req.body.seats)
=======
        bbdd.addCar(req.params.team_name, req.body.owner, req.body.ownerId, req.body.spendingGas, req.body.model, req.body.seats)
>>>>>>> 7d320e018458c01eb4660b64c65ad1e80b77d45c
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
<<<<<<< HEAD
        bbdd.updateCarId(req.params.cars_id, req.body.spendingGas, req.body.gasPrice, req.body.model, req.body.seats) //controlar que los tres parametros existan
=======
        bbdd.updateCarId(req.params.cars_id, req.body.owner, req.body.ownerId, req.body.spendingGas) //controlar que los tres parametros existan
>>>>>>> 7d320e018458c01eb4660b64c65ad1e80b77d45c
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
        bbdd.deleteCarId(req.params.cars_id)
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
<<<<<<< HEAD
        bbdd.updatePlayer(req.params.players_id, req.body.name, req.body.dorsal, req.body.nick)
=======
        bbdd.updatePlayer(req.params.players_id, req.body.nombre, req.body.dorsal, req.body.nick)
>>>>>>> 7d320e018458c01eb4660b64c65ad1e80b77d45c
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
        bbdd.deletePlayer(req.params.players_id)
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

<<<<<<< HEAD
    private getHistoric (req, res, next) {
        console.log('respuesta historic con ' + req.params.team_name);
        bbdd.getHistoric(req.params.team_name)
        .then(
            value => {

                let numData = req.params.numData;
                if(Object.keys(value).length < numData ){
                    numData = Object.keys(value).length;
                }

                let result:Array<any>;
                for(let i = 0; i < numData; i++){
                    result.push(Object.keys(value)[i]);
                }

                res.json(result);
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

    private addHistoric (req, res, next) { 
        console.log('respuesta historic con ' + req.params.team_name);
        let date:string = moment().format("YYYY/MM/DD");
        bbdd.addHistoric(req.params.team_name, req.body.pavilionId, date)
        .then(
            value => {

                for(let i = 0; i < req.body.idCars.length; i++){
                    bbdd.addTripCar(date, req.body.idCars[i]);
                }
                for(let i = 0; i < req.body.idPlayers.length; i++){
                    bbdd.addTripPlayer(date, req.body.idPlayers[i]);
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

    private getTripCars(res, req, next){
        console.log('respuesta tripCars con ' + req.params.team_name + req.params.date);
        bbdd.getTripCars(req.params.team_name, req.params.date)
=======
    private getHistoric (req, res, next) { //ToDo
        console.log('respuesta historic con ' + req.params.team_name);
        bbdd.getHistoric(req.params.team_name)
>>>>>>> 7d320e018458c01eb4660b64c65ad1e80b77d45c
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

<<<<<<< HEAD
    private getTripPlayers(res, req, next){
        console.log('respuesta tripPlayers con ' + req.params.team_name + req.params.date);
        bbdd.getTripPlayers(req.params.team_name, req.params.date)
        .then(
            value => {
                res.json(value);
                next();
=======
    private addHistoric (req, res, next) { //ToDo
        console.log('respuesta historic con ' + req.params.team_name);
        let date:string = moment().format("MM/DD/YYYY");
        bbdd.addHistoric(req.params.team_name, req.body.pavilion, date)
        .then(
            value => {
                bbdd.addTrip(date, req.body.carId, req.body.playerId);
>>>>>>> 7d320e018458c01eb4660b64c65ad1e80b77d45c
            }
        ).catch(
            err => {
                console.log('err');
                res.send(err);
                res.status(404).end();
            }
        );
<<<<<<< HEAD
        
=======
>>>>>>> 7d320e018458c01eb4660b64c65ad1e80b77d45c
    }

//+++++++++++++++++++ DEBTS +++++++++++++++++++++

    private getPlayerDebt (playerId:number, res){ //ToDo
        console.log('respuesta updatePlayerDebtId');
        return bbdd.getPlayerDebt(playerId)
        .then(
            value => {
                let result:number = value['debt'];
                return result;
            }
        ).catch(
            err => {
                console.log('err');
                res.send(err);
                res.status(404).end();
            }
        );
    }

    private updatePlayerDebt (req, res, next) { //ToDo
        console.log('respuesta updatePlayerDebt');


        let debts = this.calculateDebt(req.body.distance, req.body.cars, req.body.players); //pagos parciales de los conductores y en el 0 el total
        if (debts == null){
            console.log('err');
            res.send("error");
            res.status(404).end();

        }
        for (let i = 0; i < req.body.cars.length; i++) {
            
            bbdd.getInfoCarId(req.body.cars[i])
            .then(
                value => {

                    let oldDebt = this.getPlayerDebt(value['ownerId'], req);
                    bbdd.updatePlayerDebt(value['ownerId'], oldDebt['debt']+debts[i+1]) //actualizar las dedudas de los conductores
                    .then(
                        value => {
                            console.log("actualización de la deuda de conductores correctamente.")
                        }
                    ).catch(
                        err =>{
                            console.log('err');
                            res.send(err);
                            res.status(404).end();
                        }
                    );
                }
            );
            
        }
        
        let payment = debts[0]/req.body.players.length;

        for (let i = 0; i < req.body.players.length; i++) {
            
            let oldDebt = this.getPlayerDebt(req.body.players[i], res);
            bbdd.updatePlayerDebt(req.body.players[i], oldDebt['debt']+payment) //actualizar las dedudas de los jugadores
            .then(
                value => {
                    res.json(value);//quizá haya que hacerlo al salir del bucle viril
                    next();
                }
            ).catch(
                err =>{
                    console.log('err');
                    res.send(err);
                    res.status(404).end();
                }
           );
        }

    }

    private calculateDebt( distance:number, cars:Array<number>, players:Array<number>):Array<number>{

        let result = new Array(cars.length + 1); //0-total, resto-parciales
        let i = 0;
        let totalSpend = 0;
        
        //llamadas a la bbdd para sacar los datos de los coches
        for(let i = 0; i < cars.length; i++){
            bbdd.getInfoCarId(cars[i])
            .then(
                value => {     
                    let partialSpend = ((distance*2)*value['spendingGas']*value['gasPrice'])/100;
                    totalSpend += partialSpend;    
                    result[i+1] = partialSpend;

                }
            ).catch(
                err => {
                    return null;
                }
            );
        }
        result[0] = totalSpend;
        return result;

    }






}

export default new BasicsController();

