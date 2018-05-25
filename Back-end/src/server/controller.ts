import * as express from 'express'
import manager from './manager';

class BasicsController {

    constructor () {
    }

    // rutas Controller
    public contRoutes() {
        let router = express.Router();
        // responde a los get de la misma ruta
        router.route('/teams/')
            .get(this.devolverTeams)
            .post(this.actualizarTeams);

        router.route('/teams/:team_id')
            .get(this.devolverTeamId)
            .put(this.actualizarTeamId)
            .delete(this.borrarTeamId);

        return router;
    }

    // funciones Controller
    private function1 (req, res, next) {
        res.json({ mensaje: 'esta en el controller.'});
        next();
    }


    private devolverTeams (req, res, next) {
        console.log('respuesta devolverTeams');
        manager.leerEquipos()
        .then(
            value => {
                res.json(value);
                next();
            }
        ).catch(
            err => {
                console.log('err');
                res.send(err);
            }
        );
    }

    private actualizarTeams (req, res, next) {
        console.log('respuesta actualizarTeams');
        manager.añadirEquipo(req.body.name)
        .then(
            value => {
                res.json(value);
                next();
            }
        ).catch(
            err => {
                console.log('err');
                res.send(err);
            }
        );
    }

    private devolverTeamId (req, res, next) {
        console.log('respuesta devolverTeamId');
        next();
    }


    private actualizarTeamId (req, res, next) {
        console.log('respuesta actualizarTeamId');
        next();
    }

    private borrarTeamId (req, res, next) {
        console.log('respuesta borrarTeamId');
        next();
    }
}

export default new BasicsController();

/*

/api/teams  GET     Get all the teams.
/api/teams  POST    Create a teams.
/api/teams/:team_id     GET     Get a single team.
/api/teams/:team_id     PUT     Update a team with new info.
/api/teams/:team_id     DELETE  Delete a team. 

*/