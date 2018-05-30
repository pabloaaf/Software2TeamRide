import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {teams, players, cars, pavilions} from "../globals/globals"
import {Observable} from 'rxjs/Observable';
/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

*/
const path = "http://pabloaaf.myddns.me:3000/";
const version = "v0";


@Injectable()
export class HttpProvider {
	//variables
  data: Observable<any>;
  private nombreUss:string;
  private teamId:number;
  constructor(public http: HttpClient) {
    console.log('Hello HttpProvider Provider');

  }

  public getTeam(name:string):Observable<teams>{

  	return this.http.get<teams>(path + version + "/teams/" + name); //  en un futuro habra 
    // que poner todos los ==> , {withCredentials:true}. Pero cors da mucho trabajo
  }

  public getAllTeams():Observable<teams[]> {
    console.log("getAllTeams");
  	return this.http.get<teams[]>(path + version + "/teams/"); // , {withCredentials:true}
  }

  public putTeam(name:string){

  	return this.http.put<teams>(path + version + "/teams/", name);
  }

  public getCarList(idTeam:number):Observable<cars[]>{

    return this.http.get<cars[]>(path + version + "/cars/" + idTeam);
  }
  public setNameUss(nombre:string){

    this.nombreUss = nombre;
  }
  public getNameUss(){
    return this.nombreUss;
  }

  public getTeamID(nombreUss:string):Observable<number>{
    return this.http.get<number>(path + version + "/teams/" + nombreUss);
  }
  public getPlayNames(idTeam:number):Observable<players[]>{

     return this.http.get<players[]>(path + version + "/players/" + idTeam);
  }

  public putPabellones(nombre:string, distancia:number){
    const body = JSON.stringify({team:"cuatro valles",pavilion: nombre, distance: Number(distancia)});
    const options = {headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }};
    console.log(body);
    return this.http.post(path + version + "/pavilions/", body, options);
  }

   public putPlayers(nombre:string,nick:string,dorsal:string){
    let postdata = new FormData();
    postdata.append('name','nick','dorsal');
    postdata.append(nombre,nick,dorsal);
    this.http.post(path + version + "/players/",{
      name:nombre,
      nick:nick,
      dorsal:dorsal
      }).subscribe(
      (data:any) =>{
        console.log(data);
      });
    
   }

}
