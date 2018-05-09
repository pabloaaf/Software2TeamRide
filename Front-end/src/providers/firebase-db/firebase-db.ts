import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
/*
  Generated class for the FirebaseDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseDbProvider {

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
    let aux = 0;
    let teams = getTeams();
    for(var i = 0; i < teams.length; i++){        
      if(equipo === teams[i].name){
        aux++;
        console.log("aux :"+teams[i].name);
      }
    }
    if(aux===0){
      console.log(equipo);
      this.afDB.database.ref('teams/').set(equipo);
      this.afDB.database.ref('teams/'+equipo+'/nombre/').set(equipo);
    }
  }

  saveUser(uid, team){
    registerTeam(team);
    return this.afDB.database.ref('teams/'+team+"/registrados/").set(uid);
  }
}
