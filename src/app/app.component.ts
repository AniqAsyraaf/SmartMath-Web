import { Component, OnInit, Output } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FireBaseService, IActivities } from './services/fire-base.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FormControl, Validators} from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth} from '@angular/fire/auth'
import { error } from '@angular/compiler/src/util';
import { AngularFirestore } from '@angular/fire/firestore';
import { EventEmitter } from '@angular/core';

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
    private firestore: AngularFirestore) {}

  ngOnInit() {
    if(localStorage.getItem('users')!==null)
    this.isSignedIn = true;
    else
    this.isSignedIn = false;
  }

  onSignIn(email: string, password: string){
    this.fireBaseService.signIn(email, password)
    if(this.fireBaseService.isLoggedIn)
    this.isSignedIn =true;
  }

  onSignUp(email: string, password: string){
    this.fireBaseService.signUp(email, password)
    if(this.fireBaseService.isLoggedIn)
    this.isSignedIn =true;
  }

  handleLogout(){
    this.isSignedIn = false
  }
  // logout(){
  //   this.auth.signOut()
  //   localStorage.removeItem('users')
  // }
}
