import {Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {players} from "../../providers/globals/globals";
import {NewPlayerPage} from '../new-player/new-player';


import { HttpProvider } from '../../providers/http/http';
/**
 * Generated class for the JugadoresEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-jugadores-edit',
  templateUrl: 'jugadores-edit.html',
})
export class JugadoresEditPage {
	public jugadorVacio:players;
	public players:players[];
  constructor(public nav: NavController, public navParams: NavParams,public http:HttpProvider, public httpclient:HttpClient) {
  	this.jugadorVacio = new players(); 
  	 this.http.getPlayers().subscribe((play:players[])=>{
	    this.players = play;
	    console.log(play);
	});
  }


  public nuevoJugador(){
    console.log("peticion de jugadores.")
    this.nav.push(NewPlayerPage,this.jugadorVacio);
  }// fi


}
