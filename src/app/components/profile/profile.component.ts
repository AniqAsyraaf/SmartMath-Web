import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FireBaseService, IUsers } from '../../services/fire-base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userList: IUsers[] = [];
  currUser: IUsers;

  isSignedIn = false;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private fireBaseService: FireBaseService
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

}
