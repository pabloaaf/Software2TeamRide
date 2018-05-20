import {Component} from '@angular/core';
import {NavController, AlertController, LoadingController, Loading} from 'ionic-angular';
//import { AuthService } from '../../providers/auth-service/auth-service';
import {RegisterPage} from '../register/register';
import {TabsInitPage} from '../tabsInit/tabsInit';

import {AuthProvider} from '../../providers/auth/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loading: Loading;
  registerCredentials = {email: '', password: ''}; //registerCredentials

  constructor(private nav: NavController, private auth: AuthProvider, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {
  } //AuthService

  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public login() {
    this.showLoading()
    this.auth.loginUser(this.registerCredentials.email, this.registerCredentials.password)
      .then((user) => {
        this.nav.setRoot(TabsInitPage);
      })
      .catch(err => {
        this.showError("Acceso Denegado");
      })
  }

  /*   this.auth.login(this.registerCredentials).subscribe(allowed => {
       if (allowed) {        
         this.nav.setRoot(TabsPage);
       } else {
         this.showError("Access Denied");
       }
     },
       error => {
         this.showError(error);
       });
   }*/

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showError(text) {
    this.loading.dismiss();

    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}
