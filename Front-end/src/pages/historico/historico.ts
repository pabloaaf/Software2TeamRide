import {Component} from '@angular/core';
import {NavController,NavParams} from 'ionic-angular';

import {historic} from "../../providers/globals/globals";
import {InfoTravelPage} from "../info-travel/info-travel"
import { HttpProvider } from '../../providers/http/http';
@Component({
  selector: 'page-historico',
  templateUrl: 'historico.html'
})
export class HistoricoPage {
	public historic:historic[];
	
  constructor(public nav: NavController, public navParams: NavParams, public http:HttpProvider) {
  	this.http.infoHistorico().subscribe((his:historic[])=>{
	    this.historic = his;
	    console.log(his);
	});


  } //hacer nueva pagina para mostrar una vez elegido el historico coches y jugadores.
  	
  public verDetalles(date:string){
  	this.nav.push(InfoTravelPage, date);
  }
  	
}
