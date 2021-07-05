import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FireBaseService, IUsers } from '../../services/fire-base.service';
import { Router } from '@angular/router';
import { VoidExpression } from 'typescript';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userList: IUsers[] = [];
  currUser: IUsers;
  userUID = localStorage.getItem("userUID");
  isSignedIn = false;
  public specuser;
  condition;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private fireBaseService: FireBaseService,
    private db: AngularFirestore
  ) { }
  ngOnInit(): void {
    this.getUsers();
    // currUser = localStorage.getItem('users');
  }

  getUsers(): void {
    this.fireBaseService.getUsers().subscribe((res) => {
      this.userList = res.map((user) => {
        return {
          ...user.payload.doc.data() as {},
          id: user.payload.doc.id
        } as IUsers;
      });
    });
  }

  // getSpecificUser(){
  //   this.db.collection('users').doc('UnPwZ6StA1MzOOyWhkBmSEAKrQG2').snapshotChanges().subscribe(res => {
  //     this.userList = res.map((user) => {
  //       return {
  //         ...user.payload.doc.data() as {},
  //         id: user.payload.doc.id
  //       } as IUsers;
  //     });
  // }
  
  
}
