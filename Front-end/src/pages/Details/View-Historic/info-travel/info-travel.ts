import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {tripPlayers,tripCars,players,cars} from "../../../../providers/globals/globals";
import { HttpProvider } from '../../../../providers/http/http';
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
	public players:players[];
	public showPlayer:players[];
	public cars: cars[];
	public showCars:cars[];
	public i:number;
	public j:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpProvider) {
  	this.date = navParams.data;
  	this.tripCars = [];
  	this.tripPlayers = [];
  	this.players = [];
  	this.cars = [];
  	this.showPlayer = [];
  	this.showCars = [];
  	let contador = 0;
  	this.http.infoTripCars(this.date).subscribe((cars:tripCars[])=>{
	    this.tripCars = cars;

	});
	this.http.infoTripPlayers(this.date).subscribe((play:tripPlayers[])=>{
	    this.tripPlayers = play;


	});
	this.http.getPlayers().subscribe((play:players[])=>{
	    this.players = play;
	});
	this.http.getCarList().subscribe((car:cars[])=>{
	    this.cars = car;
	});
	for(this.i=0;this.i<this.tripPlayers.length;this.i++){
		for(this.j=0;this.j<this.players.length;this.j++){
			console.log(tripPlayers[this.i].playerId+ " " + this.players[this.j].id);
			if(this.tripPlayers[this.i].playerId == this.players[this.j].id){
				this.showPlayer[contador] = this.players[this.j];
				break;
			}
		}
	}
	console.log(this.showPlayer);
	/*contador = 0;
	for(let i=0;i<cars.length;i++){
		for(let j=0;j<cars.length;j++){
			if(this.tripCars[i].carId == this.cars[j].id){
				this.showCars[contador] = this.cars[j];
				break;
			}
		}
	}*/
	//aqui tienes ya los ids de los coches y los ids de los jugadores, para ver cuales van a cada sitio, hay que coger todos los jugadores y todos los coches y comparar ids.
	
  }

}
