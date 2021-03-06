import * as uuidRand from 'uuid/v4';
import bbdd from '../bbdd';

class LogRegController {

    constructor () {
    }

    public login(email:string, password:string) {
        return new Promise((resolve, reject) => {
            bbdd.login(email, password)
            .then(
                value => {
                    console.log(value);
                    if(Object.keys(value).length != 0){ //existe player
                        resolve(value[0]);
                    }else{
                        resolve(null);
                    }
                }
            ).catch(
                err => {
                    console.log(err);
                    //res.send('Usuario no encontrado');
                    resolve(null);
                }
            );
        }); 
    }

    public generateToken() {
        return new Promise((resolve, reject) => {
            let token:string = '';
            do {
                token = uuidRand();
            } while (!bbdd.verifyUniqueToken(token));
            bbdd.addToken(token);
            resolve(token);
        });    
    }
}
export default new LogRegController();