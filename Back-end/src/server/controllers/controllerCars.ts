import * as express from 'express';
import bbdd from '../bbdd';
import {Car} from '../models/modelCars';


class CarsController {
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

        //cars
        router.route('/cars/:team_name')
            .get(this.infoCars)
            .post(this.addCar);

        router.route('/cars/:cars_id')
            .put(this.updateCarId)
            .delete(this.deleteCarId);

        return router;
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

        let car = new Car(0, req.body.spendingGas, req.body.gasPrice, req.body.model, req.body.seats, req.body.ownerId, req.body.owner, req.params.team_name);

        //bbdd.addCar(req.body.ownerId, req.body.owner, req.params.team_name, req.body.spendingGas, req.body.gasPrice, req.body.model, req.body.seats)
        bbdd.addCar(car)
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
        let car = new Car(req.params.cars_id, req.body.spendingGas, req.body.gasPrice, req.body.model, req.body.seats);
        //bbdd.updateCarId(req.params.cars_id, req.body.spendingGas, req.body.gasPrice, req.body.model, req.body.seats) //controlar que los tres parametros existan
        bbdd.updateCarId(car)
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
        let car = new Car(req.params.cars_id);
        //bbdd.deleteCarId(req.params.cars_id)
        bbdd.deleteCarId(car)
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
export default new CarsController().contRoutes();

