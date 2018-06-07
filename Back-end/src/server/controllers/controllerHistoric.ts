import * as express from 'express';
import * as moment from 'moment';
import bbdd from '../bbdd';
import promise from '../promises/promiseDebts';
import {TripCars, TripPlayers, Historic} from '../models/modelHistoric';

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

        let historic = new Historic(req.params.team_name);
        
        //bbdd.getHistoric(req.params.team_name, req.params.numData)
        bbdd.getHistoric(historic, req.params.numData)
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
        console.log('respuesta tripCars con ' + req.params.team_name + " en " + req.params.date);

        let tripCar = new TripCars(req.params.team_name,  req.params.date);        
        //bbdd.getTripCars(req.params.team_name, req.params.date)
        bbdd.getTripCars(tripCar)
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
        console.log('respuesta tripPlayers con ' + req.params.team_name + " en " + req.params.date);
        let tripPlayer = new TripPlayers(req.params.team_name,  req.params.date);        
        //bbdd.getTripCars(req.params.team_name, req.params.date)
        bbdd.getTripPlayers(tripPlayer)
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
        let historic = new Historic(req.params.team_name, date, req.body.pavilionId);

        //bbdd.addHistoric(req.params.team_name, req.body.pavilionId, date)
        bbdd.addHistoric(historic)        
        .then(
            value => {

                let promises:Array<Promise<any>> = [];
                
                for (let i = 0; i < req.body.idCars.length; i++) {     
                    let tripCar = new TripCars(req.params.team_name, req.params.date, req.body.idCars[i]);        
                    //promises.push(bbdd.addTripCar(date, req.params.team_name, req.body.idCars[i]));
                    promises.push(bbdd.addTripCar(tripCar));
                    
                }

                for (let i = 0; i < req.body.idPlayers.length; i++) {    
                    
                    let tripPlayer = new TripPlayers(req.params.team_name,  req.params.date, req.body.idPlayers[i]);        
                    //promises.push(bbdd.addTripCar(date, req.params.team_name, req.body.idCars[i]));
                    promises.push(bbdd.addTripPlayer(tripPlayer));
                } 
                Promise.all(promises)
                .then(
                    value => {
                        console.log("historic added");
                        promise.updatePlayerDebt(req.body.pavilionId, req.params.teams, req.body.idCars, req.body.idPlayers);
                        /*.then( value => {
                            res.status(200).end();
                        });*/     
                        res.status(200).end();                   
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
}

export default new HistoricController().contRoutes();

