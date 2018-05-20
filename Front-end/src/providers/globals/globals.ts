import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';

@Injectable()
export class GlobalsService {
  public currentUser: User;

  constructor(private alertCtrl: AlertController){

  }

  public login(credentials:User) {
    this.currentUser = credentials;
  }

  public showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => { }
        }
      ]
    });
    alert.present();
  }
}

export class User {
  uid: string;
  email: string;
  team: string;
 
  constructor(uid: string, email: string, team:string) {
    this.uid = uid;
    this.email = email;
    this.team = team;
  }
}

export class Jugador {
  nombre: string;
  apodo: string;
  dorsal: string;
}

export class Equipo {
  //key
  nombre:string;
  registrados:string[];

  constructor() {
    this.registrados = [];
  }
}
//global para equipos