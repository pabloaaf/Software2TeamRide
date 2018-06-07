import bbdd from '../bbdd';

class PromisesDebt {
    public getPlayerDebt (playerId:number){ //ToDo
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
	    //Promesas para calcular las deudas
    public promiseUpdateDriversDebts(car:number, debt:number){
        
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

    public promiseUpdatePlayersDebt(player:number, debt:number){
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

    public calculateDebt( distance:number, cars:Array<number>, players:Array<number>):Array<number>{
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

    public promiseCalculateDebt(car:number, distance:number){
      
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


const promis = new PromisesDebt();

class Debt {
    constructor() {
         
    }
//+++++++++++++++++++ DEBTS +++++++++++++++++++++


    public updatePlayerDebt (pavilionId:number, team:string, cars:Array<number>, players:Array<number>) { //ToDo
        console.log('respuesta updatePlayerDebt');        
        // new promise ?
        bbdd.getPavilionDistance(pavilionId, team)
        .then(
            value => {
                let promises:Array<Promise<any>> = [];

                let debts = promis.calculateDebt(value['distance'], cars, players); //pagos parciales de los conductores y en el 0 el total
                if (debts == null){
                    return null; //hay error
                }

                for (let i = 0; i < cars.length; i++) {   
                    let oldDebt = promis.getPlayerDebt(value['ownerId']);     
                    promises.push(promis.promiseUpdateDriversDebts(cars[i],oldDebt['debt']+ debts[i+1]));
                }

                let payment = debts[0]/players.length;
                for (let i = 0; i < players.length; i++) {
                    let oldDebt = promis.getPlayerDebt(players[i]);            
                    promises.push(promis.promiseUpdatePlayersDebt(players[i], oldDebt['debt']+payment));
                } 
                Promise.all(promises)
                .then(
                    value => {
                        console.log("todo hecho papu");
                        //se supone que termina todo, responer con result("FUNCIONA");?
                    }
                )
            }
        );
    }
}
export default new Debt();