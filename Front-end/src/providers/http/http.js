var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.

*/
var path = ""; //http://pabloaaf.myddns.me:3000/
var version = "v0";
var team = "Cuatro Valles";
var options = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    }), withCredentials: true
};
var HttpProvider = /** @class */ (function () {
    function HttpProvider(http) {
        this.http = http;
    }
    //set y get de datos que guardara el front-end/////////////////////////////////////
    HttpProvider.prototype.setNameUss = function (nombre) {
        this.nombreUss = nombre;
    };
    HttpProvider.prototype.getNameUss = function () {
        return this.nombreUss;
    };
    //funciones loging/////////////////////////////////////
    HttpProvider.prototype.login = function (nombre, passw) {
        console.log('login');
    };
    HttpProvider.prototype.registrer = function () {
        console.log('registrer');
        //necesita res.body.email, res.body.password, res.body.team, req.body.name, req.body.dorsal, req.body.nick
    };
    //funciones Team////////////////////////////////////
    HttpProvider.prototype.getAllTeams = function () {
        console.log('getAllTeams');
        return this.http.get(path + version + '/teams/', options);
    };
    HttpProvider.prototype.newTeam = function (name) {
        console.log('newTeam');
        //añadiria a la base de datos.
        var body = { team: name };
        return this.http.post(path + version + '/teams/', body, options);
    };
    HttpProvider.prototype.putTeam = function (name, newName) {
        console.log('putTeam');
        var body = { name: name, newName: newName };
        return this.http.put(path + version + '/teams/', body, options);
    };
    HttpProvider.prototype.deleteTeam = function (team) {
        console.log('deleteTeam');
        var body = { name: name };
        return this.http.delete(path + version + '/teams/' + team, options);
    };
    //funciones Car//////////////////////////////////////////
    HttpProvider.prototype.getCarList = function () {
        console.log('getCarList');
        return this.http.get(path + version + "/cars/" + team);
    };
    HttpProvider.prototype.addcars = function (Dueño, DueñoID, gasGastado, modelo, asientos) {
        console.log('addcars');
        //body necesita parametros: req.body.team, req.body.owner, req.body.ownerId, req.body.spendingGas, req.body.model, req.body.seats
        //necesita equipo que deberia estar guardada en un global de http
        //const body = {team: name}; // añadir el resto
        //return this.http.post<cars>(path + version + '/cars/' + team, body, options);
    };
    HttpProvider.prototype.updateCarID = function () {
        //necesita req.params.id, req.body.owner, req.body.ownerId, req.body.spendingGas
        console.log('updateCarID');
        //const body = {name: name, newName: newName};
        //return this.http.put<cars>(path + version + '/cars/' + id_car, body, options);
    };
    HttpProvider.prototype.deleteCar = function (carId) {
        //necesita ID del coche.
        console.log('deleteCar');
        return this.http.delete(path + version + '/teams/' + carId, options);
    };
    //funciones usuarios.///////////////////////////////////
    HttpProvider.prototype.getPlayers = function () {
        console.log('getPlayers');
        return this.http.get(path + version + "/players/" + team, options);
    };
    HttpProvider.prototype.addPlayer = function (nombre, nick, dorsal) {
        console.log('addPlayer');
        var body = { team: name }; // añadir el resto
        return this.http.post(path + version + "/players/" + team, body, options);
        // necesita req.params.team_name, req.body.name, req.body.dorsal, req.body.nick
    };
    HttpProvider.prototype.updatePlayer = function () {
        // necesita req.params.id, req.body.nombre, req.body.dorsal, req.body.nick
        console.log('updatePlayer');
        //const body = {name: name, newName: newName};
        //return this.http.put<players>(path + version + '/players/' + id_player, body, options);
    };
    HttpProvider.prototype.deletePlayer = function (playerId) {
        console.log('deletePlayer');
        return this.http.delete(path + version + '/teams/' + playerId, options);
    };
    //funciones pabellones./////////////////////////////////
    HttpProvider.prototype.getPabellones = function () {
        return this.http.get(path + version + '/pavilions/' + team, options); //pongo team ahora pero mas tarde tendras que cogerlo desde el usuario_act.team
    };
    HttpProvider.prototype.postPabellones = function (nombre, distancia) {
        var body = { pavilion: nombre, distance: distancia };
        console.log(body);
        return this.http.post(path + version + '/pavilions/' + team, body, options);
    };
    HttpProvider.prototype.updatePav = function () {
        //se actualiza en funcionion del ID del pabellon.
        console.log('updatePav');
        //const body = {name: name, newName: newName};
        //return this.http.put<pavilions>(path + version + '/pavilions/' + id_player, body, options);
    };
    HttpProvider.prototype.deletePav = function (pavilionId) {
        console.log('deletePav');
        return this.http.delete(path + version + '/pavilions/' + pavilionId, options);
    };
    HttpProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], HttpProvider);
    return HttpProvider;
}());
export { HttpProvider };
//# sourceMappingURL=http.js.map