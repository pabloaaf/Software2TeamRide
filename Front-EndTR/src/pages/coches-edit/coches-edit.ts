import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {cars} from "../../providers/globals/globals";
import {CarsNewPage} from '../cars-new/cars-new';
import { HttpProvider } from '../../providers/http/http';

@Component({
  selector: 'page-coches-edit',
  templateUrl: 'coches-edit.html'
})
export class CochesEditPage {
	public cocheVacio:cars;
	public cars:cars[];
  public cocheEditar:cars;
  constructor(public nav: NavController, public navParams: NavParams,public http:HttpProvider) {
  	this.cocheVacio = new cars(0); 
  	 this.http.getCarList().subscribe((car:cars[])=>{
	    this.cars = car;
	    console.log(car);
	});
  }


  public nuevoCoche(){
    console.log("peticion de jugadores.")
    this.nav.push(CarsNewPage, this.cocheVacio);
  }
  public editarCoche(id:number){

    this.cocheEditar = new cars(id);
    this.nav.push(CarsNewPage, this.cocheEditar);
  }
  public borrarCoche(id:number){
    this.http.deleteCar(id).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });
  }

}
