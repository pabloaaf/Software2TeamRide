import {Component} from '@angular/core';

import {JugadoresEditPage} from '../jugadores-edit/jugadores-edit';
import {CochesEditPage} from '../coches-edit/coches-edit';
import {HomePage} from '../home/home';
import {PavEditPage} from '../pav-edit/pav-edit';
import {TabsInitPage} from '../tabsInit/tabsInit';

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
