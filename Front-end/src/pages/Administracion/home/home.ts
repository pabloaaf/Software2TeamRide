import {Component} from '@angular/core';
import {App} from 'ionic-angular';
import { LoginPage } from '../../Inicio/login/login';
import { HttpProvider } from '../../../providers/http/http';
import {players} from "../../../providers/globals/globals";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public playerAct:players;

  constructor(public appC:App, public http:HttpProvider) {
    this.playerAct = this.http.getplayerAct();
  }

  public logout() {
    this.appC.getRootNav().setRoot(LoginPage);
    this.http.logout();
  }
}
