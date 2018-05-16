import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseDbProvider } from '../../providers/firebase-db/firebase-db';

//import * as firebase from 'firebase/app';
@Injectable()
export class AuthProvider {

  constructor(private afAuth: AngularFireAuth, private db: FirebaseDbProvider) {
    console.log('Hello AuthProvider Provider');
  }
    // Registro de usuario
  registerUser(credentials){
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
    .then((res)=>{
      // El usuario se ha creado correctamente.
      this.db.saveUser(res.uid, credentials.team);
    })
    .catch(err=>console.log(err))
 }

  // Login de usuario
 loginUser(email:string, password:string){
   return this.afAuth.auth.signInWithEmailAndPassword(email, password)
     .then(user=>Promise.resolve(user))
     .catch(err=>Promise.reject(err))
 }

 // Devuelve la session
 get Session(){
  return this.afAuth.authState;
 }

 // Logout de usuario
 logout(){
   this.afAuth.auth.signOut().then(()=>{
     // hemos salido
   })
 }

 // Obtenemos el id de usuario.
 getUser(){
    return this.afAuth.auth.currentUser;
 }
}