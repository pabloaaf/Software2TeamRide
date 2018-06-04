import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {pavilions} from "../../providers/globals/globals";
import { HttpProvider } from '../../providers/http/http';
import {PavNewPage} from '../pav-new/pav-new';

/**
 * Generated class for the PavEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-pav-edit',
  templateUrl: 'pav-edit.html',
  //styleUrls: ['./pav-edit.scss']
})
export class PavEditPage {
  public pavVacio:pavilions;
  public pavilions:pavilions[];
  public pavEditar:pavilions;
  constructor(public nav: NavController, public navParams: NavParams,public http:HttpProvider) {
    this.pavVacio = new pavilions(0); 
     this.http.getPabellones().subscribe((pav:pavilions[])=>{
      this.pavilions = pav;
      console.log(pav);
  });
  }


  public nuevoPabellon(){
    console.log("peticion de jugadores.")
    this.nav.push(PavNewPage, this.pavVacio);
  }
  public editaPabellon(id:number){
     this.pavEditar = new pavilions(id);
     this.nav.push(PavNewPage, this.pavEditar);
   }
  public borrarPabellon(id:number){
     this.http.deletePav(id).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });
     this.pavilions.pop();
   }

}
