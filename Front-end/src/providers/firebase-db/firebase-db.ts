import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthProvider } from '../auth/auth';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the FirebaseDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseDbProvider {
  team = '';
  constructor(public afDB: AngularFireDatabase, public auth:AuthProvider) {
    console.log('Hello FirebaseDbProvider Provider');
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

  añadirjugador(player){
    return Observable.create(observer => {
      this.afDB.database.ref(this.getUserTeam(this.auth.getUser())+'/').push(player);
      observer.next(true);
      observer.complete();
    });
  }
}
