import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HttpProvider } from '../../../../providers/http/http';
import {pavilions} from "../../../../providers/globals/globals";
import {HistoricoPage} from "../../View-Historic/historico/historico";
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
	public pavilions:pavilions[];
  public pavSelec:number;
  constructor(public nav: NavController, public navParams: NavParams, public http:HttpProvider) {

  	this.http.getPabellones().subscribe((pav:pavilions[])=>{
      this.pavilions = pav;
	  });
  }

  allset() {
    this.http.addHistorico(this.pavSelec).subscribe((trip)=>{
      console.log(trip);
      this.nav.push(HistoricoPage);
    });
    console.log('allset PavDestPage');
    //this.nav.pop();
    //this.nav.pop();
  }

}
