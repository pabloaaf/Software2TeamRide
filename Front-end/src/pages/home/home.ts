import {Component} from '@angular/core';
//import { NavController } from 'ionic-angular';
//import { AuthService } from '../../providers/auth-service/auth-service';
//import { LoginPage } from '../login/login';

import {AuthProvider} from '../../providers/auth/auth';
import {FirebaseDbProvider} from '../../providers/firebase-db/firebase-db';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  email = '';
  team = '';

  constructor(private auth: AuthProvider, private db: FirebaseDbProvider) {
    //let info = this.auth.getUserInfo();
    this.email = this.auth.getUser().email;
    this.team = this.db.getUserTeam(this.auth.getUser().uid);
  }

  public logout() {
    this.auth.logout();
  }
}
