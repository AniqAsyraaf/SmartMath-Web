import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FireBaseService, IActivities, IUsers } from '../../services/fire-base.service';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { error } from '@angular/compiler/src/util';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userUID = localStorage.getItem("users")
  user: IUsers = {
    id: '',
    login: '',
    name: '',
    password: '',
    role: 'Student',
  }

  // emailFormControl = new FormControl('', [
  //   Validators.required,
  //   Validators.email,
  // ]);

  hide = true;
  isSignedIn = false;
  //isLoggedIn = false;
  

  constructor(
    private modalService: NgbModal,
    public auth: AngularFireAuth,
    private fireBaseService: FireBaseService,
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // if (localStorage.getItem('users') !== null)
    //   this.isSignedIn = true;
    // else
    //   this.isSignedIn = false;
  }

  onRegister() {
    if (this.user.name != '' && this.user.login != '' && this.user.password != '') {
      // this.auth.createUserWithEmailAndPassword(this.user.login, this.user.password)
      // .then(res => {
      //   this.isLoggedIn = true
      //   localStorage.setItem('users', JSON.stringify(res.user))
      //   this.user.id = res.user?.uid;
      // });
      this.fireBaseService.addUsers(this.user);
      this.user.name = '';
      this.user.login = '';
      this.user.password = '';
      //this.user.confirmPassword = '';
    }
  }

  // onSignUp(email: string, password: string) {
  //   this.fireBaseService.signUp(email, password)
  //   if (this.fireBaseService.isLoggedIn)
  //     this.isSignedIn = true;
  // }

}
