import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {RegisterPage} from '../pages/register/register';
import {AuthService} from '../providers/auth-service/auth-service';

import {HistoricoPage} from '../pages/historico/historico';
import {CochesEditPage} from '../pages/coches-edit/coches-edit';
import {TabsInitPage} from '../pages/tabsInit/tabsInit';
import {TabsConfigPage} from '../pages/tabsConfig/tabsConfig';
import {JugadoresPage} from '../pages/jugadores/jugadores';
import {JugadoresEditPage} from '../pages/jugadores-edit/jugadores-edit';
import {AddRegistroPage} from '../pages/add-registro/add-registro';
import {HistoricoJugPage} from '../pages/historico-jug/historico-jug';
import {PavEditPage} from '../pages/pav-edit/pav-edit';


import {AuthProvider} from '../providers/auth/auth';
import {FirebaseDbProvider} from '../providers/firebase-db/firebase-db';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { HttpProvider } from '../providers/http/http';
import { GlobalsProvider } from '../providers/globals/globals';

import { HttpClientModule } from '@angular/common/http';

export const firebaseConfig = {
  apiKey: "AIzaSyCMWvRNwryUgVySCWoE3_oMgnmIcc7_7rY",
  authDomain: "teamride-a6569.firebaseapp.com",
  databaseURL: "https://teamride-a6569.firebaseio.com",
  projectId: "teamride-a6569",
  storageBucket: "teamride-a6569.appspot.com",
  messagingSenderId: "336674272326"
};


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
    PavEditPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule
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
    PavEditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    AuthProvider,
    FirebaseDbProvider,
    HttpProvider,
    GlobalsProvider
  ]
})
export class AppModule {
}