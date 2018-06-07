import * as express from 'express';
import * as uuidRand from 'uuid/v4';
import bbdd from '../bbdd';

class LogRegController {
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
            .post(this.login);

        router.route('/register/')
            .post(this.register);

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
        if(req.body.password.length >0) {
            bbdd.login(req.body.email, req.body.password).then(
                value => {
                    console.log(value);
                    if(Object.keys(value).length != 0){ //existe player
                        let token:string = '';
                        do {
                            token = uuidRand();
                        } while (!bbdd.verifyUniqueToken(token));
                        bbdd.addToken(token);                        
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
        } else{
            res.status(404).json({message: "contraseña incorrecta"});
        }
        
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
                                    if(Object.keys(value).length != 0){ //existe player
                                        let token:string = '';
                                        do {
                                            token = uuidRand();
                                        } while (!bbdd.verifyUniqueToken(token).then(
                                            value => {
                                                return value;
                                            }
                                        ));
                                        bbdd.addToken(token);
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
                                    if(Object.keys(value).length != 0){ //existe player
                                        let token:string = '';
                                        do {
                                            token = uuidRand();
                                        } while (!bbdd.verifyUniqueToken(token));
                                        bbdd.addToken(token);                                        
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
}
export default new LogRegController().contRoutes();

