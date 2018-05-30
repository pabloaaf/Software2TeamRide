import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {AddRegistroPage} from '../add-registro/add-registro';
import { HttpProvider } from '../../providers/http/http';
import {players} from "../../providers/globals/globals";
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the HistoricoJugPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historico-jug',
  templateUrl: 'historico-jug.html',
})
export class HistoricoJugPage {
	players;
	jugadoresSelec;
  constructor(public nav: NavController, public navParams: NavParams,private http:HttpProvider,private alert: AlertController) {
  	this.players = [];
  	this.jugadoresSelec = null;
  	this.http.getTeamID(this.http.getNameUss()).subscribe((teamId:number) =>{
	  	this.http.getPlayNames(teamId).subscribe((play:players[])=>{
	  		for(var i = 0; i < play.length; i++){
	        	this.players.push(play[i].nick);
	        	console.log(play[i].nick);
	      	}
	  	});
  	});
  }


  public sendCar(){
  	if(this.jugadoresSelec == null){
  		let alert = this.alert.create({
		    title: 'Error',
		    subTitle: 'Escoja algun jugador',
		    buttons: ['volver']
		  });
		  alert.present();
		
  	}
  	else if(this.jugadoresSelec.length<6){
  		//Saltar a la pagina de elegir pabellones.
  		console.log("enviaria el coche a la base de datos");
  	}
  	else if(this.jugadoresSelec.length>6){
  		let alert = this.alert.create({
		    title: 'Error',
		    subTitle: 'el numero de jugadores es demasiado',
		    buttons: ['volver']
		  });
		  alert.present();
		
  	}
  	
  	
  }

}
