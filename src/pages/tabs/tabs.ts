import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage; //pagina de jugadores
  tab2Root = AboutPage; //pagina añadir
  tab3Root = ContactPage; //pagina historico
  tab4Root = HomePage; //otra pagina de tabs

  constructor() {

  }
}
