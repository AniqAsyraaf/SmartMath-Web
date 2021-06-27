import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  getActivities(){
    return this.firestore.collection('activity').snapshotChanges();
  }

  addAcvities(payload: IActivities){
    return this.firestore.collection('activity').add(payload);
  }

  updateActivities(activityID: string, payload: IActivities){
    return this.firestore.doc('activity/' + activityID).update(payload);
  }

  deleteActivities(activityID: string){
    return this.firestore.doc('activity/' + activityID).delete();
  }



}

// export interface IUsers {
//   id?:string;
//   login: string;
//   name: string;
//   password: string;
//   role: string;
// }

export interface IActivities{
  id?: string;
  category: string;
  date: string;
  description: string;
  file: string;
  title: string;
  tutorialdate: string;
  uid: string;
  
}