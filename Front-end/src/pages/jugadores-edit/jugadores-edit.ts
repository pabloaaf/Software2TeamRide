import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';


import { HttpProvider } from '../../providers/http/http';
/**
 * Generated class for the JugadoresEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jugadores-edit',
  templateUrl: 'jugadores-edit.html',
})
export class JugadoresEditPage {
	datosPla = { nombre: '', nick: '', dorsal: '' };
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpProvider) {
  }

  public saveData(){
  	console.log(this.datosPla.nombre + " " + this.datosPla.nick + " "+ this.datosPla.dorsal  + " ");
  	this.http.putPlayers(this.datosPla.nombre,this.datosPla.nick,this.datosPla.dorsal);
  }

}
