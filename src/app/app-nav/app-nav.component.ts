import { Component, OnInit, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {FormControl, Validators} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FireBaseService, IActivities, IUsers } from '../services/fire-base.service';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import {AngularFireAuth} from '@angular/fire/auth'
import { error } from '@angular/compiler/src/util';
import { AngularFirestore } from '@angular/fire/firestore';
import { EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
export class AppNavComponent implements OnInit {

  
  title:String = "SmartMath";
  hide = true;
  isSignedIn = false;
  userRole;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  @Output() isLogout = new EventEmitter<void>()

  constructor(
    private breakpointObserver: BreakpointObserver,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private fireBaseService: FireBaseService,
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router) {}

  ngOnInit() {
    this.userRole=localStorage.getItem('userRole')
  }

  logout(){
    this.fireBaseService.logout()
    this.isLogout.emit()
    this.router.navigate(['/']);
  }

}
