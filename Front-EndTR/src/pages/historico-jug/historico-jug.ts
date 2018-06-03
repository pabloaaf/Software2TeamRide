import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import {players,cars} from "../../providers/globals/globals";
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
  public cars:number[];
  constructor(public nav: NavController, public navParams: NavParams,private http:HttpProvider,private alert: AlertController) {
  	this.players = [];
  	this.jugadoresSelec = null;
  	this.cars = navParams.data;

    this.http.getPlayers().subscribe((play:players[])=>{
      this.players = play;
      console.log(play);
      console.log(cars);
    });
  }


  public sendCar(){
  	if(this.jugadoresSelec.length == 0){
  		let alert = this.alert.create({
		    title: 'Error',
		    subTitle: 'Escoja algun jugador',
		    buttons: ['volver']
		  });
		  alert.present();
		
  	}
  	else if(this.jugadoresSelec.length<6){
  		//Saltar a la pagina de elegir pabellones.
       console.log(this.jugadoresSelec[0]);
       this.http.setIdViajes(this.cars,this.jugadoresSelec);
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
