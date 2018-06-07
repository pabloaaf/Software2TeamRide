import {Component} from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {players} from "../../../../providers/globals/globals";
import {NewPlayerPage} from '../new-player/new-player';
import { HttpProvider } from '../../../../providers/http/http';
/**
 * Generated class for the JugadoresEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-jugadores-edit',
	templateUrl: 'jugadores-edit.html'
})
export class JugadoresEditPage {
	public jugadorVacio:players;
	public players:players[];
  constructor(public nav: NavController, public navParams: NavParams,public http:HttpProvider) {

  }

  ionViewWillEnter() {
    this.jugadorVacio = new players(0); 
    this.http.getPlayers().subscribe((play:players[])=>{
      this.players = play;
    });
  }


  public nuevoJugador(){
    console.log("peticion de jugadores.");
    this.nav.push(NewPlayerPage, this.jugadorVacio);
  }
  public editarJugador(id:number){
    console.log(this.players[id-1]);
    
  	this.nav.push(NewPlayerPage, this.players[id-1]);
  }
  public borrarJugador(id:number){
  	this.http.deletePlayer(id).subscribe(data => {
	      console.log(data);
	    }, error => {
	      console.log(error);
	    });
    this.players.pop();
  }

}
