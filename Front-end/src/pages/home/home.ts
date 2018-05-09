import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';
//import { AuthService } from '../../providers/auth-service/auth-service';
//import { LoginPage } from '../login/login';

import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username = '';
  email = '';
  constructor(private auth: AuthProvider) { //private nav: NavController
    //let info = this.auth.getUserInfo();
    //this.username = info['name'];
    //this.email = info['email'];
  }
 
  public logout() {
    this.auth.logout(); //     this.nav.push(LoginPage)

  }

}
