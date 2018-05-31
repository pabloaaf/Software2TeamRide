import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HttpProvider } from '../../providers/http/http';
import {pavilions} from "../../providers/globals/globals";
/**
 * Generated class for the PavDestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-pav-dest',
  templateUrl: 'pav-dest.html',
})
export class PavDestPage {
	pavilions;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:HttpProvider) {

  	this.http.getPabellones().subscribe((pav:pavilions[])=>{
	  	for(var i = 0; i < pav.length; i++){
	        this.pavilions.push(pav[i].name);
	        console.log(pav[i].name);
	      }
	  });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PavDestPage');
  }

}
