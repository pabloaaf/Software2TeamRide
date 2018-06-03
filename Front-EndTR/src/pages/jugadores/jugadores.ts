import {Component} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';

import {players} from "../../providers/globals/globals";
import { HttpProvider } from '../../providers/http/http';

/**
 * Generated class for the JugadoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-jugadores',
  templateUrl: 'jugadores.html',
})
export class JugadoresPage {
	public players:players[];
	//mostrar lista de jugadores con: nombre, nick, deuda, dorsal
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:HttpProvider) {
  	this.http.getPlayers().subscribe((play:players[])=>{
	    this.players = play;
	    console.log(play);
		});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JugadoresPage');
  }
  public pagarDeuda(id:number){


  }

}
