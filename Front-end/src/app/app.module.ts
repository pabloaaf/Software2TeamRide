import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {HistoricoPage} from '../pages/historico/historico';
import {CochesEditPage} from '../pages/coches-edit/coches-edit';
import {TabsInitPage} from '../pages/tabsInit/tabsInit';
import {TabsConfigPage} from '../pages/tabsConfig/tabsConfig';
import {JugadoresPage} from '../pages/jugadores/jugadores';
import {JugadoresEditPage} from '../pages/jugadores-edit/jugadores-edit';
import {AddRegistroPage} from '../pages/add-registro/add-registro';
import {HistoricoJugPage} from '../pages/historico-jug/historico-jug';
import {PavEditPage} from '../pages/pav-edit/pav-edit';
import {PavDestPage} from '../pages/pav-dest/pav-dest';
import {NewPlayerPage} from '../pages/new-player/new-player';

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
    NewPlayerPage
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
    NewPlayerPage

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