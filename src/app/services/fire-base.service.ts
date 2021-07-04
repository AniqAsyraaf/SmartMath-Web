import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth'


@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

  isLoggedIn = false;
  //object: IUsers;
  
  constructor(
    private firestore: AngularFirestore,
    public auth: AngularFireAuth
  ) { }

  getActivities() {
    return this.firestore.collection('activity').snapshotChanges();
  }

  addAcvities(payload: IActivities) {
    return this.firestore.collection('activity').add(payload);
  }

  updateActivities(activityID: string, payload: IActivities) {
    return this.firestore.doc('activity/' + activityID).update(payload);
  }

  deleteActivities(activityID: string) {
    return this.firestore.doc('activity/' + activityID).delete();
  }

  getUsers(){
    return this.firestore.collection('users').snapshotChanges();
  }

  addUsers(user: IUsers) {
    this.auth.createUserWithEmailAndPassword(user.login, user.password)
      .then(res => {
        this.isLoggedIn = true
        localStorage.setItem('users', JSON.stringify(res.user?.uid))
      });
    // user: IUsers =localStorage.getItem('users');
    this.firestore.collection('users').add(user);
  }

  async signIn(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true
        localStorage.setItem('users', JSON.stringify(res.user?.uid))
      })
  }

  signUp(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true
        localStorage.setItem('users', JSON.stringify(res.user))
      })
  }

  logout() {
    this.auth.signOut()
    localStorage.removeItem('users')
  }

}

// export interface IUsers {
//   id?:string;
//   login: string;
//   name: string;
//   password: string;
//   role: string;
// }

export interface IActivities {
  id?: string;
  category: string;
  date: string;
  description: string;
  file: string;
  title: string;
  tutorialdate: string;
  uid: string;
}

export interface IUsers {
  id?: string;
  login: string;
  name: string;
  password: string;
  role: string;
}