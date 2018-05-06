import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthProvider {

  constructor(private afAuth :  AngularFireAuth) {
    console.log('Hello AuthProvider Provider');
  }

}