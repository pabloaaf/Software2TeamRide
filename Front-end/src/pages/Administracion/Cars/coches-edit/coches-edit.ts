import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {cars} from "../../../../providers/globals/globals";
import {CarsNewPage} from '../cars-new/cars-new';
import { HttpProvider } from '../../../../providers/http/http';

@Component({
  selector: 'page-coches-edit',
  templateUrl: 'coches-edit.html'
})
export class CochesEditPage {
	public cocheVacio:cars;
	public cars:cars[];
  constructor(public nav: NavController, public navParams: NavParams,public http:HttpProvider) {
  }

  ionViewWillEnter() {
    this.cocheVacio = new cars(0);
    this.http.getCarList().subscribe((car:cars[])=>{
      this.cars = car;
    });
  }


  public nuevoCoche(){
    console.log("peticion de jugadores.")
    this.nav.push(CarsNewPage, this.cocheVacio);
  }
  public editarCoche(id:number){
    console.log(this.cars[id-1]);
    this.nav.push(CarsNewPage, this.cars[id-1]);
  }
  public borrarCoche(id:number){
    this.http.deleteCar(id).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });
    this.cars.pop();
  }

}
