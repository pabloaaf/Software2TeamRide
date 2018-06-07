import {Component} from '@angular/core';

import {HistoricoPage} from '../View-Historic/historico/historico';
import {JugadoresPage} from '../jugadores/jugadores';
import {AddRegistroPage} from '../New-Historic/add-registro/add-registro';
import {TabsConfigPage} from '../../Administracion/tabsConfig/tabsConfig';

import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'tabsInit.html'
})
export class TabsInitPage {

  tab1Root = JugadoresPage; //pagina de jugadores
  tab2Root = AddRegistroPage; //pagina añadir registro
  tab3Root = HistoricoPage; //pagina historico

  constructor(private nav: NavController) {
  }

  openConfig() {
    this.nav.setRoot(TabsConfigPage); //this.nav.push(RegisterPage);
  }
}
