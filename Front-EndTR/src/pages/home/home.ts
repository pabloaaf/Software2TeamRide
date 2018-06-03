import {Component} from '@angular/core';
import {App} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HttpProvider } from '../../providers/http/http';
import {players} from "../../providers/globals/globals";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public playerAct:players;

  constructor(public appC:App, public http:HttpProvider) {
    this.playerAct = this.http.getplayerAct();
    //let info = this.auth.getUserInfo();
    //this.email = this.auth.getUser().email;
    //this.team = this.db.getUserTeam(this.auth.getUser().uid);
  }

  public logout() {
    this.appC.getRootNav().setRoot(LoginPage);
    //this.nav.setRoot(LoginPage);
    //this.auth.logout();
  }
}
