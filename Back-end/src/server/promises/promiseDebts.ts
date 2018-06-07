import bbdd from '../bbdd';

class PromisesDebt {
    public calculateDebt( distance:number, cars:Array<number>, players:Array<number>):Promise<Array<number>>{
        return new Promise((resolve, reject) => {
            let result:Array<number> = []; //0-total, resto-parciales
            result.push(0);
            let promises:Array<Promise<any>> = [];
            for (let i = 0; i < cars.length; i++) {     
                promises.push(bbdd.getInfoCarId(cars[i]));
            }
    
            Promise.all(promises)
            .then(
                value => {
                    let i = 0;
                    for (let object of value){
                        let gastoParcial:number = ((distance*2)*object[0].spendingGas*object[0].gasPrice)/100; 
                        result.push(gastoParcial);
                        result[0] += gastoParcial;
                        i++;
                    }
                    resolve(result);
                }
            ).catch(
                err => {
                    reject(err);
                }
                    
            );
    
		});
    }

    public promiseUpdate (team:string, cars:Array<number>, players:Array<number>, value:Array<number>):Promise<Array<Promise<any>>>{
        let promisesUpdateDebt:Array<Promise<any>> = [];        
        return new Promise((resolve, reject) => {
            let totalSpend = value[0];
            let partialSpend: Array<number> = [];
            let aux = 0;
            for (let v of value) {
                if (aux != 0){
                    partialSpend.push(v);
                }
                aux++;
            }

            let promisesGetDriver:Array<Promise<any>> = [];
            for (let i = 0; i < cars.length; i++) {   
                promisesGetDriver.push(bbdd.getInfoCarId(cars[i]));
            }
            Promise.all(promisesGetDriver)
            .then(
                drivers => {
                    
                    let promisesDriverDebts:Array<Promise<any>> = [];                
                    for (let d of drivers) {  
                        promisesDriverDebts.push(bbdd.getPlayerDebt(d[0].ownerId));
                    }

                    Promise.all(promisesDriverDebts)
                    .then(
                        debtDrivers => {          
                            let aux = 0;                  
                            for (let d of debtDrivers) {  
                                promisesUpdateDebt.push(bbdd.updatePlayerDebt(d[0].id,d[0].debt + partialSpend[aux]));
                                aux++; 
                            } 
                            let payment =totalSpend/players.length;
                            let promisesPlayersDebts:Array<Promise<any>> = [];       
                            for (let i = 0; i < players.length; i++) {   
                                promisesPlayersDebts.push(bbdd.getPlayerDebt(players[i]));
                            }

                            Promise.all(promisesPlayersDebts)
                            .then(
                                debtPlayers => {                             
                                    for (let d of debtPlayers) {  
                                        promisesUpdateDebt.push(bbdd.updatePlayerDebt(d[0].id, d[0].debt - payment)); 
                                    } 

                                    resolve(promisesUpdateDebt);
                                }
                            );
                        }
                    )
                }
            );

        });
    }
}

const promis = new PromisesDebt();

class Debt {
    constructor() {
         
    }
//+++++++++++++++++++ DEBTS +++++++++++++++++++++

    public updatePlayerDebt (distance:number, team:string, cars:Array<number>, players:Array<number>) { 
        console.log('respuesta updatePlayerDebt');        
        // new promise ?

        promis.calculateDebt(distance, cars, players)
        .then(
            value => {
                promis.promiseUpdate(team, cars, players, value)
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