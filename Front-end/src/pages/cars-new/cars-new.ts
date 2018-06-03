import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {cars,players} from "../../providers/globals/globals";
import { HttpProvider } from '../../providers/http/http';

/**
 * Generated class for the CarsNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cars-new',
  templateUrl: 'cars-new.html',
})
export class CarsNewPage {
	public coche:cars;
  public players:players[];
  public idSelec:number;
  public i:number;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpProvider) {
  	this.coche = navParams.data;

    this.http.getPlayers().subscribe((play:players[])=>{
      this.players = play;
      console.log(play);
    });
  }

  public saveCar(){
    for(this.i = 0;this.i<this.players.length;this.i++){

      if(this.players[this.i].id == this.idSelec){
        //console.log(this.players[this.i].name);
         this.coche.owner = this.players[this.i].name;
      }
    }

    this.coche.ownerID = this.idSelec;
  	console.log(this.coche.owner +" " +this.coche.ownerID + "" + this.coche.spendingGas + "" + this.coche.model+ "" + this.coche.seats);
      if(this.coche.id == 0){
  	    this.http.addcars(this.coche.owner,this.coche.ownerID,this.coche.spendingGas,this.coche.model,this.coche.seats,this.coche.gasPrice).subscribe(data => {
        console.log(data); //de donde coño se saca owner id
      }, error => {
        console.log(error);
      });
    }
    else{
      this.http.updateCarID(this.coche.id,this.coche.ownerID,this.coche.spendingGas,this.coche.model,this.coche.seats,this.coche.gasPrice).subscribe(data => {
        console.log(data);//cear nueva pagina para los coches la existente no sirve.
      }, error => {
        console.log(error);
      });
      /*this.http.updatePlayer(this.jugador.name,this.jugador.nick,this.jugador.dorsal, this.jugador.id).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });*/

    }
  }
  	/*this.http.updateCarID(this.coche.owner,this.coche.spendingGas,this.coche.model).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });*/
}

