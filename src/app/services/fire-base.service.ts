import { Injectable, Input } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth'
import { FileUpload } from '../models/file-upload';
import { Observable, of } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, switchMap } from 'rxjs/operators';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { finalize } from 'rxjs/operators';
import { fromStringWithSourceMap } from 'source-list-map';


@Injectable({
  providedIn: 'root'
})

export class FireBaseService {

  isLoggedIn = false;
  private basePath = '/files';
  userID;
  userUID;
  tempUID;
  userLogin;
  userName;
  userPassword;
  userRole;
  downloadURL;
  dateTime;
  activityLogin;
  description;
  category;
  tutoDate;
  title;
  cityRef: any;
  datesubmit;
  filesubmit;
  comment = null;
  activityID;
  id = null;

  constructor(
    private firestore: AngularFirestore,
    public auth: AngularFireAuth,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage
  ) {}


  //Activity
  getActivities(){
    return this.firestore.collection('activity').snapshotChanges();
  }

  addActivities(activity: IActivities) {
    this.tempUID = localStorage.getItem('tempUID');
    this.userID = JSON.parse(this.tempUID);
    this.downloadURL = localStorage.getItem('downloadURL');
    this.dateTime = localStorage.getItem('activityDate');
    this.title= localStorage.getItem('activityTitle');
    this.description = localStorage.getItem('activityDescription');
    this.category = localStorage.getItem('activityCategory');
    this.tutoDate = localStorage.getItem('activityTutoDate');

    this.firestore.collection('activity').doc().set(
      {
        uid: this.userID,
        date: this.dateTime,
        file: this.downloadURL,
        title: this.title,
        description: this.description,
        category: this.category,
        tutorialdate: this.tutoDate
      }
    )
  }
  
  // NOT USED
  // updateActivities(activityID: string, payload: IActivities) {
  //   this.tempUID = localStorage.getItem('tempUID');
  //   this.userID = JSON.parse(this.tempUID);
  //   this.downloadURL = localStorage.getItem('downloadURL');
  //   this.dateTime = localStorage.getItem('date');

  //   this.firestore.doc('activity/' + activityID).update(
  //     {
  //       uid: this.userID,
  //       date: this.dateTime,
  //       file: this.downloadURL
  //     }
  //   );
  // }

  // deleteActivities(activityID: string) {
  //   return this.firestore.doc('activity/' + activityID).delete();
  // }

  //Submission
  getSubmissions(){
    return this.firestore.collection('submission').snapshotChanges();
  }

  addSubmissions(submission: ISubmissions) {
    this.activityID = localStorage.getItem('activityID');
    this.datesubmit = localStorage.getItem('activityDate');
    this.filesubmit = localStorage.getItem('downloadURL');
    this.userID = localStorage.getItem('userUID');

    this.firestore.collection('submission').doc().set(
      {
        aid: this.activityID,
        comment: this.comment,
        datesubmit: this.datesubmit,
        filesubmit: this.filesubmit,
        id: this.id,
        uid: this.userID,
       
      }
    )
  }
  
  //Sign In, Sign Up & Sign Out
  signIn(email: string, password: string){
    this.auth.signInWithEmailAndPassword(email, password)
    .then(res =>
    {
      this.isLoggedIn = true
      localStorage.setItem('users',JSON.stringify(res.user)) 
      localStorage.setItem('tempUID',JSON.stringify(res.user?.uid))
      this.tempUID = localStorage.getItem('tempUID')
      this.userID = JSON.parse(this.tempUID);
      localStorage.setItem('userUID', this.userID)
    }) 

    this.userUID = localStorage.getItem('userUID')
    var docRef = this.firestore.collection('users').doc(this.userID);
    console.log(this.userUID)
    docRef.get()
    .toPromise().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            var tempRole = doc.get("role");
            console.log(tempRole);
            localStorage.setItem('userRole', tempRole)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  }

  addUsers(user: IUsers) {
    this.auth.createUserWithEmailAndPassword(user.login, user.password)
      .then(res => 
      {
        this.isLoggedIn = true
        localStorage.setItem('users', JSON.stringify(res.user))
        localStorage.setItem('tempUID', JSON.stringify(res.user?.uid))
        this.tempUID = localStorage.getItem('tempUID')
        this.userID = JSON.parse(this.tempUID);
        this.userLogin = localStorage.getItem('userLogin')
        this.userName = localStorage.getItem('userName')
        this.userPassword = localStorage.getItem('userPassword')
        this.userRole = localStorage.getItem('userRole')
        console.log(this.userID);
        this.firestore.collection('users').doc(this.userID).set({
          id: this.userID,
          login: this.userLogin,
          name: this.userName,
          password: this.userPassword,
          role: this.userRole
        });
        window.alert("Register Sucessful")
      });
  }
  
  logout() {
    this.auth.signOut()
    localStorage.clear()
    // localStorage.removeItem('users')
  }

  getUsers(){
    return this.firestore.collection('users').snapshotChanges();
  }

  getUsername(uid : string) {
    return (this.firestore.doc(`users/${uid}`).get())
  }

  //Files
  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
          localStorage.setItem("downloadURL", downloadURL)
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  getActivity(activity){
    var docRef = this.firestore.collection('activty').doc(activity);
    console.log(activity)
    docRef.get()
    .toPromise().then((doc) => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            // var tempRole = doc.get("id");
            // console.log(tempRole);
            // localStorage.setItem('tempAID', tempRole)
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
  }
}

export interface IUsers {
  id:string;
  login: string;
  name: string;
  password: string;
  role: string;
}

export interface IActivities{
  id: string;
  category: string;
  date: string;
  description: string;
  file: string;
  title: string;
  tutorialdate: string;
  uid: string;
}

export interface ISubmissions{
  aid: string;
  comment: string;
  datesubmit: string;
  filesubmit: string;
  id: string;
  uid: string;
}

