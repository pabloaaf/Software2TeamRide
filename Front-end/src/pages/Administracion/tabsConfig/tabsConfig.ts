import {Component} from '@angular/core';

import {JugadoresEditPage} from '../Players/jugadores-edit/jugadores-edit';
import {CochesEditPage} from '../Cars/coches-edit/coches-edit';
import {HomePage} from '../home/home';
import {PavEditPage} from '../Pavilions/pav-edit/pav-edit';
import {TabsInitPage} from '../../Details/tabsInit/tabsInit';

import {NavController} from 'ionic-angular';

@Component({
  templateUrl: 'tabsConfig.html'
})
export class TabsConfigPage {

  tab1Root = HomePage;
  tab2Root = JugadoresEditPage;
  tab3Root = CochesEditPage;
  tab4Root = PavEditPage;
  
  //añadir nuevo tab
  constructor(private nav: NavController) {
  }

  openInit() {
    this.nav.setRoot(TabsInitPage);
  }
}
