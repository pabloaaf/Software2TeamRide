import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';

import {HistoricoJugPage} from '../historico-jug/historico-jug';
//import { AuthProvider } from '../../providers/auth/auth';
import { HttpProvider } from '../../providers/http/http';
import {cars} from "../../providers/globals/globals";
import {players} from "../../providers/globals/globals";

/**
 * Generated class for the AddRegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-registro',
  templateUrl: 'add-registro.html',
})
export class AddRegistroPage {

 cars;
  players;
  constructor(public nav: NavController,private http:HttpProvider) {
    
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
    this.nav.push(HistoricoJugPage);
  }// fin showplayers

}
