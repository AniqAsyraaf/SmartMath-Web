import { Component, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FireBaseService, IActivities, IUsers } from './services/fire-base.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormControl, Validators} from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth} from '@angular/fire/auth'
import { error } from '@angular/compiler/src/util';
import { AngularFirestore } from '@angular/fire/firestore';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'SmartMath-Web';

  email: string;
  password: string;
  hide = true;
  isSignedIn = false;
  isSignUp = false;
  userID = localStorage.getItem("userUID")
  userRole: string;

  user: IUsers = {
    id: '',
    login: '',
    name: '',
    password: '',
    role: 'Student',
  }
  

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  // // private form: FormGroup;

  // public activityList: IActivities[] = [];

  // // public activityDetails: IActivities;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private fireBaseService: FireBaseService,
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,) {}

  ngOnInit() {
    if(localStorage.getItem('users')!==null)
    this.isSignedIn = true;
    else
    this.isSignedIn = false;
    
  }

  onSignIn(email: string, password: string){

    var userUID = this.fireBaseService.signIn(email, password)
    if(this.fireBaseService.isLoggedIn)
    this.isSignedIn =true;
    
    // this.fireBaseService.getUsername(this.userID).subscribe(
    //   (data) => this.userRole = data.exists ? data.data().role : undefined
    // )
    localStorage.setItem("userRole", this.userRole)
    this.router.navigate(['/']);
  }

  onRegister() {
    if (this.user.name != '' && this.user.login != '' && this.user.password != '') {
      // this.auth.createUserWithEmailAndPassword(this.user.login, this.user.password)
      // .then(res => {
      //   this.isLoggedIn = true
      //   localStorage.setItem('users', JSON.stringify(res.user))
      //   this.user.id = res.user?.uid;
      // });
      localStorage.setItem('userLogin', this.user.login)
      localStorage.setItem('userName', this.user.name)
      localStorage.setItem('userPassword', this.user.password)
      localStorage.setItem('userRole', this.user.role)
      
      this.fireBaseService.addUsers(this.user);
      this.user.name = '';
      this.user.login = '';
      this.user.password = '';
      //this.user.confirmPassword = '';
    }
    else{
      window.alert("Please fill in all details")
    }
  }

  handleLogout(){
    this.isSignedIn = false;
  }
  
  handleSignUp(){
    this.isSignUp = true;
  }

  handleSignIn(){
    this.isSignUp = false;
  }
}
