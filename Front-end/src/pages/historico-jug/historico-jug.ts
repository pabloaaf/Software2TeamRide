import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {AddRegistroPage} from '../add-registro/add-registro';
import { HttpProvider } from '../../providers/http/http';
import {players} from "../../providers/globals/globals";
import { AlertController } from 'ionic-angular';
import {PavDestPage} from '../pav-dest/pav-dest';
/**
 * Generated class for the HistoricoJugPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-historico-jug',
  templateUrl: 'historico-jug.html',
})
export class HistoricoJugPage {
  public players:players[];
	public jugadoresSelec:number[];
  constructor(public nav: NavController, public navParams: NavParams,private http:HttpProvider,private alert: AlertController) {
  	this.players = [];
  	this.jugadoresSelec = null;
  	
    this.http.getPlayers().subscribe((play:players[])=>{
      this.players = play;
      console.log(play);
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
  		 this.nav.push(PavDestPage); 
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
