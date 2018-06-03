import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {tripPlayers,tripCars} from "../../providers/globals/globals";
import { HttpProvider } from '../../providers/http/http';
/**
 * Generated class for the InfoTravelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info-travel',
  templateUrl: 'info-travel.html',
})
export class InfoTravelPage {
	public date:string;
	public tripPlayers:tripPlayers[];
	public tripCars:tripCars[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpProvider) {
  	this.date = navParams.data;
  	
  	this.http.infoTripCars(this.date).subscribe((cars:tripCars[])=>{
	    this.tripCars = cars;

	});
	this.http.infoTripPlayers(this.date).subscribe((play:tripPlayers[])=>{
	    this.tripPlayers = play;

	});
	//aqui tienes ya los ids de los coches y los ids de los jugadores, para ver cuales van a cada sitio, hay que coger todos los jugadores y todos los coches y comparar ids.
	
  }

}
