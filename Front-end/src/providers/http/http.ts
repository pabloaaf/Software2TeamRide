import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {teams, players, cars, pavilions, register,tripCars,tripPlayers,historic} from "../globals/globals";
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
  //private registrado = new players(0);
  private idcoches: number[];
  private idJugadores:number[];

  private token:string;
  private playerAct:players;

  constructor(public http: HttpClient) { }


  //set y get de datos que guardara el front-end/////////////////////////////////////
  public setNameUss(nombre: string){// yo creo que tiene mas sentido crear un tipo user act y almacenar email, nombre y equipo
    this.nombreUss = nombre;
  }

  public getplayerAct(){// yo creo que tiene mas sentido crear un tipo user act y almacenar email, nombre y equipo
    return this.playerAct;
  }

  public setIdViajes(coches:number[],jugadores:number[]){

    this.idcoches=coches;
    this.idJugadores = jugadores;
  }
  public getIdJugadores(){
      return this.idJugadores;
  }
   public getIdcoches(){
    return this.idcoches;
  }
  //funciones loging/////////////////////////////////////
  public login(email: string, passw: string){
    console.log('login');
    const body = {email: email, password: passw};
    return new Promise((resolve, reject) => {
     this.http.post(path + version + '/login/', body, options).subscribe((log:register)=>{
      this.playerAct = log.player;
      this.token = log.token;
      resolve(true);
     }, error => {
      resolve(false);
    });
   });
  }

  public registrer(email:string,passw:string,name:string,nick:string,dorsal:number,team:string){
    console.log('registrer');
    const body = {email:email,password:passw,team:team,name:name,dorsal:dorsal,nick:nick};
    //necesita res.body.email, res.body.password, res.body.team, req.body.name, req.body.dorsal, req.body.nick
    return this.http.post<players>(path + version + '/players/', body,options);
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
    return this.http.delete(path + version + '/teams/' + this.playerAct.team , options);
  }

  //funciones Car//////////////////////////////////////////
  public getCarList():Observable<cars[]>{
    console.log('getCarList');
    return this.http.get<cars[]>(path + version + "/cars/" + this.playerAct.team);
  }

  public addcars(Dueño: string, DueñoID: number, gasGastado: number, modelo: string, asientos: number,gasPrice:number){
    console.log('addcars');
    //body necesita parametros: req.body.team, req.body.owner, req.body.ownerId, req.body.spendingGas, req.body.model, req.body.seats
    //necesita equipo que deberia estar guardada en un global de http
    const body = {owner:Dueño,ownerId:DueñoID,gasPrice:gasPrice,spendingGas:gasGastado,model:modelo,seats:asientos};
    return this.http.post<cars>(path + version + '/cars/' + team, body, options);
  }

  public updateCarID(id:number,idDueño:number,spedingGas:number,modelo: string, asientos: number,gasPrice:number){
    //necesita req.params.id, req.body.owner, req.body.ownerId, req.body.spendingGas
    console.log('updateCarID');
    //const body = {name: name, newName: newName};
    const body = {id:id,ownerId:idDueño,spendingGas:spedingGas,model:modelo,seats:asientos,gasPrice:gasPrice};
    //console.log(id + " " + idDueño + " " + spedingGas);
    return this.http.put<cars>(path + version + '/cars/' + id, body, options);
  }
  public deleteCar(carId: number){
    //necesita ID del coche.
    console.log('deleteCar');
    return this.http.delete(path + version + '/teams/' + carId, options);
  }

  //funciones usuarios.///////////////////////////////////
  public getPlayers():Observable<players[]>{
    console.log('getPlayers');
    return this.http.get<players[]>(path + version + "/players/" + this.playerAct.team, options);
  }

  public addPlayer(nombre: string,nick: string,dorsal: number){
    console.log('addPlayer');
    const body = {name:nombre,nick:nick,dorsal:dorsal}; // añadir el resto
    return this.http.post<players>(path + version + "/players/" + this.playerAct.team, body, options);
    // necesita req.params.team_name, req.body.name, req.body.dorsal, req.body.nick

  }

  public updatePlayer(id:number,nombre: string,nick: string,dorsal: number){
    // necesita req.params.id, req.body.nombre, req.body.dorsal, req.body.nick
    console.log('updatePlayer');
    //const body = {name: name, newName: newName};
     const body = {name:nombre,nick:nick,dorsal:dorsal};
    return this.http.put<players>(path + version + '/players/' + id, body, options);
  }

  public deletePlayer(playerId: number){
    console.log('deletePlayer');
    return this.http.delete(path + version + '/players/' + playerId, options);
  }


  //funciones pabellones./////////////////////////////////
  public getPabellones() {
    return this.http.get<pavilions[]>(path + version + '/pavilions/' + this.playerAct.team, options); //pongo team ahora pero mas tarde tendras que cogerlo desde el usuario_act.team
  }

  public postPabellones(nombre: string, distancia: number) {
    const body = {pavilion: nombre, distance: distancia};
    console.log(body);
    return this.http.post<pavilions>(path + version + '/pavilions/' + this.playerAct.team, body, options);
  }

  public updatePav(pavilionId: number,nombre: string, distancia: number){
    //se actualiza en funcionion del ID del pabellon.
    console.log('updatePav');
    const body = {pavilion: nombre,distance:distancia};
    return this.http.put<pavilions>(path + version + '/pavilions/' + pavilionId, body, options);
  }

  public deletePav(pavilionId: number){
    console.log('deletePav');
    return this.http.delete(path + version + '/pavilions/' + pavilionId, options);
  }

  //funciones histotic/////////////////////////////////////////////////
  public addHistorico(pavilion:number){

    //console.log("manda la peticion con:" + this.idcoches + " " + this.idJugadores + " " + pavilion);
    const body = {pavilionId: pavilion,idCars:this.idcoches,idPlayers:this.idJugadores};
    return this.http.post(path + version + '/hitoric/' + this.playerAct.team, body, options);
  }
  public infoTripCars(date:string){
    return this.http.get<tripCars[]>(path + version + '/tripCars/' + this.playerAct.team + "/" + date, options);
  }
  public infoTripPlayers(date:string){
    return this.http.get<tripPlayers[]>(path + version + '/tripPlayers/' + this.playerAct.team + "/" + date, options); 
  }
  public infoHistorico(numData:number){
    return this.http.get<historic[]>(path + version + '/historic/' + this.playerAct.team + "/" + numData, options);
  }
}

