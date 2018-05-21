import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import { AuthProvider } from '../../providers/auth/auth';
import { HttpProvider } from '../../providers/http/http';
import {cars} from "../../providers/globals/globals";
import {players} from "../../providers/globals/globals";
@Component({
  selector: 'page-historico',
  templateUrl: 'historico.html'
})
export class HistoricoPage {

	cars;
	players;
  constructor(public navCtrl: NavController,private http:HttpProvider) {
  	
  	//console.log(this.http.getNameUss());
  	this.cars = [];
  	this.http.getTeamID(this.http.getNameUss()).subscribe((teamId:number) =>{
	  	this.http.getCarList(teamId).subscribe((coches:cars[])=>{
	  		for(var i = 0; i < coches.length; i++){
	        	this.cars.push(coches[i].id);
	      	}
	  	});
  	});
  }//fin constructor

  public showplayers(){
  	console.log("peticion de jugadores.")
  	this.players = [];
  	this.http.getTeamID(this.http.getNameUss()).subscribe((teamId:number) =>{
	  	this.http.getPlayNames(teamId).subscribe((play:players[])=>{
	  		for(var i = 0; i < play.length; i++){
	        	this.players.push(play[i].id);
	      	}
	  	});
  	});
  }// fin showplayers
}
