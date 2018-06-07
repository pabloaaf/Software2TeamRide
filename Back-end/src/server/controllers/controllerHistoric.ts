import * as express from 'express';
import * as moment from 'moment';
import bbdd from '../bbdd';

class HistoricController {
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

        //Historico 
        router.route('/historic/:team_name/:numData')
             .get(this.getHistoric);

        router.route('/historic/:team_name/')
             .post(this.addHistoric);

        //auxiliares historico
        router.route('/tripCars/:team_name/:date')
             .get(this.getTripCars);

        router.route('/tripPlayers/:team_name/:date')
             .get(this.getTripPlayers);


        return router;
    }

//+++++++++++++++++++  HISTORIC  ++++++++++++++++++

    private getHistoric (req, res, next) {
        console.log('respuesta getHistoric con ' + req.params.team_name);
        console.log(req.params);
        bbdd.getHistoric(req.params.team_name, req.params.numData)
        .then(
            value => {
                console.log(value);
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

    private getTripCars(req, res, next){
        console.log(req.params);
        console.log('respuesta tripCars con ' + req.params.team_name + " en " + req.params.date);
        bbdd.getTripCars(req.params.team_name, req.params.date)
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

    private getTripPlayers(req, res, next){
        console.log(req.params);
        console.log('respuesta tripPlayers con ' + req.params.team_name + " en " + req.params.date);
        bbdd.getTripPlayers(req.params.team_name, req.params.date)
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

    private addHistoric (req, res, next) { 
        console.log('respuesta addHistoric con ' + req.params.team_name);
        let date:string = moment().format("YYYY-MM-DD");
        console.log(date);
        date = date.substring(0,10);
        console.log(date);

        bbdd.addHistoric(req.params.team_name, req.body.pavilionId, date)
        .then(
            value => {

                let promises:Array<Promise<any>> = [];
                
                for (let i = 0; i < req.body.idCars.length; i++) {     
                    promises.push(bbdd.addTripCar(date, req.params.team_name, req.body.idCars[i]));
                }

                for (let i = 0; i < req.body.idPlayers.length; i++) {
                    promises.push(bbdd.addTripPlayer(date, req.params.team_name, req.body.idPlayers[i]));
                } 
                Promise.all(promises)
                .then(
                    value => {
                        console.log("todo hecho papu");
                        this.updatePlayerDebt(req.body.pavilionId, req.params.teams, req.body.cars, req.body.players);                        
                    }
                )
            }
        ).catch(
            err => {
                console.log('err');
                res.send(err);
                res.status(404).end();
            }
        );
        
    }

//+++++++++++++++++++ DEBTS +++++++++++++++++++++
    private getPlayerDebt (playerId:number){ //ToDo
        console.log('respuesta updatePlayerDebtId');
        return bbdd.getPlayerDebt(playerId)
        .then(
            value => {
                let result:number = value['debt'];
                return result;
            }
        ).catch(
            err => {
                return null;
            }
        );
    }

    private updatePlayerDebt (pavilionId:number, team:string, cars:Array<number>, players:Array<number>) { //ToDo
        console.log('respuesta updatePlayerDebt');        

        bbdd.getPavilionDistance(pavilionId, team)
        .then(
            value => {
                let promises:Array<Promise<any>> = [];

                let debts = this.calculateDebt(value['distance'], cars, players); //pagos parciales de los conductores y en el 0 el total
                if (debts == null){
                    return null; //hay error
                }

                for (let i = 0; i < cars.length; i++) {   
                    let oldDebt = this.getPlayerDebt(value['ownerId']);     
                    promises.push(this.promiseUpdateDriversDebts(cars[i],oldDebt['debt']+ debts[i+1]));
                }

                let payment = debts[0]/players.length;
                for (let i = 0; i < players.length; i++) {
                    let oldDebt = this.getPlayerDebt(players[i]);            
                    promises.push(this.promiseUpdatePlayersDebt(players[i], oldDebt['debt']+payment));
                } 
                Promise.all(promises)
                .then(
                    value => {
                        console.log("todo hecho papu");
                    }
                )
            }
        );
    }
    
    //Promesas para calcular las deudas
    private promiseUpdateDriversDebts(car:number, debt:number){
        
        return bbdd.getInfoCarId(car)
        .then(
            value => {
                bbdd.updatePlayerDebt(value['ownerId'], debt) //actualizar las dedudas de los conductores
                .then(
                    value => {
                        console.log("actualización de la deuda de conductores correctamente.");
                        
                    }
                ).catch(
                    err =>{
                        return null;
                    }
                );
            }
        );
    }

    private promiseUpdatePlayersDebt(player:number, debt:number){
        return bbdd.updatePlayerDebt(player, debt) //actualizar las dedudas de los jugadores
        .then(
            value => {
                console.log("actualización de la deuda de jugadores correctamente.");
            }
        ).catch(
            err =>{
                return null;
            }
        );
    }

    private calculateDebt( distance:number, cars:Array<number>, players:Array<number>):Array<number>{
        let result = new Array(cars.length + 1); //0-total, resto-parciales
        let i = 0;
        let totalSpend = 0;

        let promises:Array<Promise<any>> = [];
        for (let i = 0; i < cars.length; i++) {     
            promises.push(this.promiseCalculateDebt(cars[i], distance));
        }

        Promise.all(promises)
        .then(
            value => {
                console.log(value);
            }
        );
        /*
        //llamadas a la bbdd para sacar los datos de los coches
        for(let i = 0; i < cars.length; i++){
            bbdd.getInfoCarId(cars[i])
            .then(
                value => {     
                    //let partialSpend = ((distance*2)*value['spendingGas']*value['gasPrice'])/100;
                    totalSpend += partialSpend;    
                    result[i+1] = partialSpend;

                }
            ).catch(
                err => {
                    return null; //hay errores
                }
            );
        }
        result[0] = totalSpend;
        */
        return result;
        
    }

    private promiseCalculateDebt(car:number, distance:number){
      
        return bbdd.getInfoCarId(car)
        .then(
            value => {     
            }
        ).catch(
            err => {
                return null; //hay errores
            }
        );
    }
        
}

export default new HistoricController().contRoutes();

