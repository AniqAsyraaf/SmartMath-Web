// import { Component, OnInit } from '@angular/core';
// import {FormControl, Validators} from '@angular/forms';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { FireBaseService, IActivities, IUsers } from '../../services/fire-base.service';
// import { Form, FormBuilder, FormGroup } from '@angular/forms';
// import { AngularFireModule } from '@angular/fire';
// import {AngularFireAuth} from '@angular/fire/auth'
// import { error } from '@angular/compiler/src/util';
// import { AngularFirestore } from '@angular/fire/firestore';


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {

//   email: string;
//   password: string;
  
//   public userList: IUsers[] = [];

//   emailFormControl = new FormControl('', [
//     Validators.required,
//     Validators.email,
//   ]);

//   hide = true;
//   isSignedIn = false;
//   constructor(
//     private fb: FormBuilder,
//     private modalService: NgbModal,
//     private fireBaseService: FireBaseService,
//     public auth: AngularFireAuth,
//     private firestore: AngularFirestore
//     ) {}

//   ngOnInit() {
//     if(localStorage.getItem('users')!==null)
//     this.isSignedIn = true;
//     else
//     this.isSignedIn = false;
//   }

//   onSignIn(email: string, password: string){
//     this.fireBaseService.signIn(email, password)
//     if(this.fireBaseService.isLoggedIn)
//     this.isSignedIn =true;
//   }

//   onSignUp(email: string, password: string){
//     this.fireBaseService.signUp(email, password)
//     if(this.fireBaseService.isLoggedIn)
//     this.isSignedIn =true;
//   }

  

  
//   // login(){

//   //   if( this.firestore.collection('users'+this.email) )
//   // }

// }
