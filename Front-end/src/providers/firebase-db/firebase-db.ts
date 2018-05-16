import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
/*
  Generated class for the FirebaseDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseDbProvider {
  team = '';
  constructor(public afDB: AngularFireDatabase) {
    console.log('Hello FirebaseDbProvider Provider');
  }
  guardaSitio(sitio){
     sitio.id  = Date.now();
     return this.afDB.database.ref('sitios/'/*+this.auth.getUser() Aqui ira el id del equipo+'/'*/+sitio.id).set(sitio)
  }

  getSitios(){
    return this.afDB.list('sitios/').valueChanges();
  }
  getSitio(id){
    return this.afDB.list('sitios/'+id).valueChanges();
  }

  getTeams(){
    return this.afDB.list('teams/').valueChanges();
  }

  registerTeam(equipo){
    this.afDB.database.ref('teams/').push(equipo);
    this.afDB.database.ref('teams/'+equipo+'/nombre/').set(equipo);
  }

  saveUserTeam(uid, team){
    this.team = team;
    return this.afDB.database.ref('teams/'+team+"/registrados").push(uid);
  }

  getUserTeam(uid){
    console.log("  hola ");
    if(this.team === ''){
      this.getTeams().subscribe(equipos=>{
        console.log(equipos);
        for(var i = 0; i < equipos.length; i++){
          //for(var j = 0; j < equipos[i].registrados.length; j++){
            if(uid === equipos[i].registrados){
              this.team = equipos[i].nombre;
              return this.team;
            }
          //}
        }
      });
    }else{
      return this.team;
    }
  }
}
