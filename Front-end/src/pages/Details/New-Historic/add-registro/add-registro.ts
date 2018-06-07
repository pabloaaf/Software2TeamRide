import {Component} from '@angular/core';
import { NavController} from 'ionic-angular';

import {HistoricoJugPage} from '../historico-jug/historico-jug';
//import { AuthProvider } from '../../providers/auth/auth';
import { HttpProvider } from '../../../../providers/http/http';
import {cars} from "../../../../providers/globals/globals";

/**
 * Generated class for the AddRegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-registro',
  templateUrl: 'add-registro.html',
})
export class AddRegistroPage {
 public cochesSelec:number[];
 public cars:cars[];
  constructor(public nav: NavController,private http:HttpProvider) {
    
    //console.log(this.http.getNameUss());
    this.http.getCarList().subscribe((coches:cars[])=>{
        this.cars = coches;
      });
  }//fin constructor

  public showplayers(){
    console.log("peticion de jugadores.")
    this.nav.push(HistoricoJugPage,this.cochesSelec);
  }// fin showplayers

}
