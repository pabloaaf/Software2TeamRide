import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {teams, players, cars, pavilions} from "../globals/globals";
import {Observable} from 'rxjs/Observable';
/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

*/
const path = ""; //http://pabloaaf.myddns.me:3000/
const version = "v0";
const team = "Cuatro Valles";
const options = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }), withCredentials: true
};

@Injectable()
export class HttpProvider {
	//variables
  private nombreUss:string;

  constructor(public http: HttpClient) { }


  //set y get de datos que guardara el front-end/////////////////////////////////////
  public setNameUss(nombre: string){// yo creo que tiene mas sentido crear un tipo user act y almacenar email, nombre y equipo
    this.nombreUss = nombre;
  }

  public getNameUss(){
    return this.nombreUss;
  }

  //funciones loging/////////////////////////////////////
  public login(nombre: string, passw: string){
    console.log('login');
  }

  public registrer(){
    console.log('registrer');
    //necesita res.body.email, res.body.password, res.body.team, req.body.name, req.body.dorsal, req.body.nick
  }

  //funciones Team////////////////////////////////////
  public getAllTeams(): Observable<teams[]> {
    console.log('getAllTeams');
    return this.http.get<teams[]>(path + version + '/teams/', options);
  }

  public newTeam(name: string){
    console.log('newTeam');
    //añadiria a la base de datos.
    const body = {team: name};
    return this.http.post<teams>(path + version + '/teams/', body, options);
  }

  public putTeam(name: string, newName: string) {
    console.log('putTeam');
    const body = {name: name, newName: newName};
    return this.http.put<teams>(path + version + '/teams/', body, options);
  }

  public deleteTeam(team: string) {
    console.log('deleteTeam');
    const body = {name: name};
    return this.http.delete(path + version + '/teams/' + team , options);
  }

  //funciones Car//////////////////////////////////////////
  public getCarList():Observable<cars[]>{
    console.log('getCarList');
    return this.http.get<cars[]>(path + version + "/cars/" + team);
  }

  public addcars(Dueño: string, DueñoID: string, gasGastado: number, modelo: string, asientos: number){
    console.log('addcars');
    //body necesita parametros: req.body.team, req.body.owner, req.body.ownerId, req.body.spendingGas, req.body.model, req.body.seats
    //necesita equipo que deberia estar guardada en un global de http
    //const body = {team: name}; // añadir el resto
    //return this.http.post<cars>(path + version + '/cars/' + team, body, options);
  }

  public updateCarID(){
    //necesita req.params.id, req.body.owner, req.body.ownerId, req.body.spendingGas
    console.log('updateCarID');
    //const body = {name: name, newName: newName};
    //return this.http.put<cars>(path + version + '/cars/' + id_car, body, options);
  }
  public deleteCar(carId: number){
    //necesita ID del coche.
    console.log('deleteCar');
    return this.http.delete(path + version + '/teams/' + carId, options);
  }

  //funciones usuarios.///////////////////////////////////
  public getPlayers():Observable<players[]>{
    console.log('getPlayers');
    return this.http.get<players[]>(path + version + "/players/" + team, options);
  }

  public addPlayer(nombre: string,nick: string,dorsal: number){
    console.log('addPlayer');
    const body = {team: name}; // añadir el resto
    return this.http.post<players>(path + version + "/players/" + team, body, options);
    // necesita req.params.team_name, req.body.name, req.body.dorsal, req.body.nick

  }

  public updatePlayer(){
    // necesita req.params.id, req.body.nombre, req.body.dorsal, req.body.nick
    console.log('updatePlayer');
    //const body = {name: name, newName: newName};
    //return this.http.put<players>(path + version + '/players/' + id_player, body, options);
  }

  public deletePlayer(playerId: number){
    console.log('deletePlayer');
    return this.http.delete(path + version + '/teams/' + playerId, options);
  }


  //funciones pabellones./////////////////////////////////
  public getPabellones() {
    return this.http.get<pavilions[]>(path + version + '/pavilions/' + team, options); //pongo team ahora pero mas tarde tendras que cogerlo desde el usuario_act.team
  }

  public postPabellones(nombre: string, distancia: number) {
    const body = {pavilion: nombre, distance: distancia};
    console.log(body);
    return this.http.post<pavilions>(path + version + '/pavilions/' + team, body, options);
  }

  public updatePav(){
    //se actualiza en funcionion del ID del pabellon.
    console.log('updatePav');
    //const body = {name: name, newName: newName};
    //return this.http.put<pavilions>(path + version + '/pavilions/' + id_player, body, options);
  }

  public deletePav(pavilionId: number){
    console.log('deletePav');
    return this.http.delete(path + version + '/pavilions/' + pavilionId, options);
  }

  //funciones histotic/////////////////////////////////////////////////

}

