import {Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {players} from "../../providers/globals/globals";


import { HttpProvider } from '../../providers/http/http';
/**
 * Generated class for the NewPlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-player',
  templateUrl: 'new-player.html',
})
export class NewPlayerPage {
	public datosPla:players;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpProvider, public httpclient:HttpClient) {
  	this.datosPla = navParams.data;
  }

  public saveData(){ //cuando se usa nav, se le pueden pasar parametros como el jugador.
  	//console.log(this.datosPla.nombre + " " + this.datosPla.nick + " "+ this.datosPla.dorsal  + " ");
  	this.http.addPlayer(this.datosPla.name,this.datosPla.nick,this.datosPla.dorsal);
  }
}
