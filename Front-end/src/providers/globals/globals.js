var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
/*
  Generated class for the GlobalsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var GlobalsProvider = /** @class */ (function () {
    function GlobalsProvider() {
        console.log('Hello GlobalsProvider Provider');
    }
    GlobalsProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], GlobalsProvider);
    return GlobalsProvider;
}());
export { GlobalsProvider };
var teams = /** @class */ (function () {
    function teams() {
    }
    return teams;
}());
export { teams };
var players = /** @class */ (function () {
    function players() {
        this.id = 0;
    }
    return players;
}());
export { players };
var cars = /** @class */ (function () {
    function cars() {
    }
    return cars;
}());
export { cars };
var pavilions = /** @class */ (function () {
    function pavilions() {
    }
    return pavilions;
}());
export { pavilions };
var pavteam = /** @class */ (function () {
    function pavteam() {
    }
    return pavteam;
}());
export { pavteam };
//# sourceMappingURL=globals.js.map