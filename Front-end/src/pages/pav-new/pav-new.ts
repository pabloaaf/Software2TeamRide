import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpProvider } from '../../providers/http/http';
import {pavilions} from "../../providers/globals/globals";

/**
 * Generated class for the PavNewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pav-new',
  templateUrl: 'pav-new.html',
})
export class PavNewPage {
	public pavilion:pavilions; //donde se guarda el nombre del pabellon
  constructor(public nav: NavController, public navParams: NavParams,public http:HttpProvider) {
    this.pavilion = navParams.data;
  }

  public savePavilion(){
  	// console.log("entra, nombre del pabellon " + this.pavilion.name + " distancia: " + this.pavilion.distance);
    
    // IMPORTANTE DISTINGIR POST Y PUT EN FUNCION DEL ID == 0
    if(this.pavilion.id == 0){
    	this.http.postPabellones(this.pavilion.pavilion, this.pavilion.distance).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });;
    }
    else{
      this.http.updatePav(this.pavilion.id,this.pavilion.pavilion, this.pavilion.distance).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });;
    }
  }

}
