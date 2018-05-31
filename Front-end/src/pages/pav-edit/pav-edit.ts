import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HttpProvider } from '../../providers/http/http';
/**
 * Generated class for the PavEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-pav-edit',
  templateUrl: 'pav-edit.html',
})
export class PavEditPage {

	safePav = { nombre: '', distancia: 0}; //donde se guarda el nombre del pabellon
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpProvider) {
  }

  public putPav(){
  	console.log("entra, nombre del pabellon " + this.safePav.nombre + " distancia: " + this.safePav.distancia);
  	this.http.postPabellones(this.safePav.nombre, this.safePav.distancia).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });;
  }

}
