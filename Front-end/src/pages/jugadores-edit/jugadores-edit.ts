import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';

/**
 * Generated class for the JugadoresEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-jugadores-edit',
  templateUrl: 'jugadores-edit.html',
})
export class JugadoresEditPage {
	
	player = { nombre: '', apodo: '', dorsal: '' }; //registerCredentials

  constructor(public navCtrl: NavController, public navParams: NavParams, private db: FirebaseDbProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JugadoresEditPage');
  }

  public saveData() {
    this.db.añadirjugador(this.player).then(() => {
    	//this.showPopup("Success", "Player created.");
    })
    .catch(err=>{
    	//this.showPopup("Error", "Problem creating player.");
    });
  }


  /*showPopup(title, text) {                  EXPORTAR A PROVIDER
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            if (this.createSuccess) {
              this.nav.popToRoot();
            }
          }
        }
      ]
    });
    alert.present();
  }*/
}
