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
	public players:players[];
	public showPlayer:players[];
	public cars: cars[];
	public showCars:cars[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpProvider) {
  	this.date = navParams.data;
  	this.players = [];
  	this.cars = [];
  	this.showPlayer = [];
  	this.showCars = [];
  	let contador = 0;
  	let contador2 = 0;
  	let auxTripPlayers = [];
  	let auxTripCars = [];
  	let i =0;
  	let j = 0;
  	this.http.infoTripCars(this.date).subscribe((cars:tripCars[])=>{
  		for(i=0;i<cars.length;i++){
	    	auxTripCars[i] = cars[i].carId;
	    }
	});
	this.http.infoTripPlayers(this.date).subscribe((play:tripPlayers[])=>{
	    for(i=0;i<play.length;i++){
	    	auxTripPlayers[i] = play[i].playerId;
	    }
	    

	});
	this.http.getPlayers().subscribe((play:players[])=>{
	    this.players = play;

	    for(i=0;i<auxTripPlayers.length;i++){
			for(j=0;j<play.length;j++){
				if(auxTripPlayers[i] == play[j].id){
					this.showPlayer[contador] = play[j];
					contador++;
					break;
				}
			}
		}

	    
	});
	this.http.getCarList().subscribe((car:cars[])=>{
	    this.cars = car;
	    if(auxTripCars.length != 0){
	    	for(i=0;i<auxTripCars.length;i++){
				for(j=0;j<car.length;j++){
					if(auxTripCars[i] == car[j].id){
						this.showCars[contador2] = car[j];
						contador2++;
						break;
					}
				}
			}
	    }

	});
	
	//console.log(this.tripPlayers + " " +this.players);
	//console.log(this.tripPlayers.length + " " +this.players.length)
	/*
	if(auxTripCars.length != 0){
	    	for(i=0;i<auxTripCars.length;i++){
				for(j=0;j<car.length;j++){
					if(auxTripCars[i] == car[j].id){
						this.showCars[contador2] = car[j];
						console.log(this.showCars[contador2]);
						//console.log(contador + " " + this.showCars);
						contador2++;
						break;
					}
				}
			}
	    }









	for(this.i=0;this.i<this.tripPlayers.length;this.i++){
		for(this.j=0;this.j<this.players.length;this.j++){
			console.log(tripPlayers[this.i].playerId+ " " + this.players[this.j].id);
			if(this.tripPlayers[this.i].playerId == this.players[this.j].id){
				this.showPlayer[contador] = this.players[this.j];
				break;
			}
		}
	}*/
	
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
