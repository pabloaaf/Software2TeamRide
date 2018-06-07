import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/Administracion/home/home';
import {LoginPage} from '../pages/Inicio/login/login';
import {RegisterPage} from '../pages/Inicio/register/register';
import {HistoricoPage} from '../pages/Details/View-Historic/historico/historico';
import {CochesEditPage} from '../pages/Administracion/Cars/coches-edit/coches-edit';
import {TabsInitPage} from '../pages/Details/tabsInit/tabsInit';
import {TabsConfigPage} from '../pages/Administracion/tabsConfig/tabsConfig';
import {JugadoresPage} from '../pages/Details/jugadores/jugadores';
import {JugadoresEditPage} from '../pages/Administracion/Players/jugadores-edit/jugadores-edit';
import {AddRegistroPage} from '../pages/Details/New-Historic/add-registro/add-registro';
import {HistoricoJugPage} from '../pages/Details/New-Historic/historico-jug/historico-jug';
import {PavEditPage} from '../pages/Administracion/Pavilions/pav-edit/pav-edit';
import {PavDestPage} from '../pages/Details/New-Historic/pav-dest/pav-dest';
import {NewPlayerPage} from '../pages/Administracion/Players/new-player/new-player';
import {PavNewPage} from '../pages/Administracion/Pavilions/pav-new/pav-new';
import {CarsNewPage} from '../pages/Administracion/Cars/cars-new/cars-new';
import {InfoTravelPage} from '../pages/Details/View-Historic/info-travel/info-travel';

import { HttpProvider } from '../providers/http/http';
import { GlobalsProvider } from '../providers/globals/globals';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    HistoricoPage,
    CochesEditPage,
    TabsInitPage,
    TabsConfigPage,
    JugadoresPage,
    JugadoresEditPage,
    AddRegistroPage,
    HistoricoJugPage,
    PavEditPage,
    PavDestPage,
    NewPlayerPage,
    PavNewPage,
    CarsNewPage,
    InfoTravelPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    HistoricoPage,
    CochesEditPage,
    TabsInitPage,
    TabsConfigPage,
    JugadoresPage,
    JugadoresEditPage,
    AddRegistroPage,
    HistoricoJugPage,
    PavEditPage,
    PavDestPage,
    NewPlayerPage,
    PavNewPage,
    CarsNewPage,
    InfoTravelPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HttpProvider,
    GlobalsProvider
  ]
})
export class AppModule {
}