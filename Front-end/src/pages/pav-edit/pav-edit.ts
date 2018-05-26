import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpProvider } from '../../providers/http/http';
/**
 * Generated class for the PavEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pav-edit',
  templateUrl: 'pav-edit.html',
})
export class PavEditPage {

	safePav = ''; //donde se guarda el nombre del pabellon
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpProvider) {
  }

  public putPav(){

  	console.log("entra, nombre del pabellon " + this.safePav);
  	this.http.putPabellones(this.safePav);
  }

}
