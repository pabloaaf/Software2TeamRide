import * as express from 'express'

class BasicsMiddleware {
    private rutaMiddleware: string = '/mid';

    constructor () {
    }

    // rutas middleware

    public midRoutes() {
        let router = express.Router();
        router.all('/', this.confirmarApi); // comprobar que la api funciona
        router.use(this.rutaMiddleware, this.log); //responde a todo en /api/Basics
        return router;
    }

    //funciones middleware

    private log (req, res, next) {
        console.log('respuesta funcion 1 /mid');
        next();
    }
    private confirmarApi (req, res, next) {
        res.json({ mensaje: 'bienvenido a la api de teamride.'})
        next();
    }
    private function2 (req, res, next) {
        console.log('respuesta funcion 2 ' + this.rutaMiddleware);
        next();
    }
}

export default new BasicsMiddleware().midRoutes();