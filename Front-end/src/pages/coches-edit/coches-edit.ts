import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-coches-edit',
  templateUrl: 'coches-edit.html'
})
export class CochesEditPage {


	datosCoches = { dueno: '', gasGastado: 0, modelo:'', asientos:0};
  constructor(public navCtrl: NavController) {

  }

  public addNewCar(){
  	console.log(this.datosCoches.dueno + "" + this.datosCoches.gasGastado + "" + this.datosCoches.modelo + "" + this.datosCoches.asientos);
  }
}
