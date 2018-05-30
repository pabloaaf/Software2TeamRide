import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
//import { AuthService } from '../../providers/auth-service/auth-service';

import {teams} from "../../providers/globals/globals";
import { HttpProvider } from '../../providers/http/http';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  createSuccess = false;
  registerCredentials = { email: '', password: '', team: '' }; //registerCredentials
  teams;

  constructor(private nav: NavController, private http:HttpProvider, private alertCtrl: AlertController) {
    this.teams = [];
    this.http.getAllTeams().subscribe((equipos:teams[])=>{
      console.log(equipos);
      for(var i = 0; i < equipos.length; i++){
        this.teams.push(equipos[i].name);
      }
    });
  }

  public register() {
    let aux = 0;
    for(var i = 0; i < this.teams.length; i++){
      if(this.registerCredentials.team === this.teams[i]){
        aux++;
      }
    }
    if(aux===0){
      //this.db.registerTeam(this.registerCredentials.team);
    }
    /*this.auth.registerUser(this.registerCredentials)
    .then((user) => {
      this.showPopup("Success", "Account created.");
    })
    .catch(err=>{
      this.showPopup("Error", "Problem creating account.");
    });*/
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
}
