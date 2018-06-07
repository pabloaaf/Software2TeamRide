import {Component} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {players} from "../../../../providers/globals/globals";
import { HttpProvider } from '../../../../providers/http/http';
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
	public jugador:players;
  constructor(public nav: NavController, public navParams: NavParams,public http:HttpProvider) {
  	this.jugador = navParams.data;
  	console.log(this.jugador.id);
  }

  public savePlayer(){ //cuando se usa nav, se le pueden pasar parametros como el jugador.
  	//console.log(this.datosPla.nombre + " " + this.datosPla.nick + " "+ this.datosPla.dorsal  + " ");

    //IMPLEMENTAR UN CONTROL DE SI EL DORSAL ESTA COGIDO
    if(this.jugador.id == 0){
	  	this.http.addPlayer(this.jugador.name,this.jugador.nick,this.jugador.dorsal).subscribe(data => {
	      console.log(data);
	    }, error => {
	      console.log(error);
	    });
  	}
  	else{
  		this.http.updatePlayer(this.jugador.id,this.jugador.name,this.jugador.nick,this.jugador.dorsal).subscribe(data => {
	      console.log(data);
	    }, error => {
	      console.log(error);
	    });
  		/*this.http.updatePlayer(this.jugador.name,this.jugador.nick,this.jugador.dorsal, this.jugador.id).subscribe(data => {
	      console.log(data);
	    }, error => {
	      console.log(error);
	    });*/

  	}
    this.nav.pop();
  }
}
