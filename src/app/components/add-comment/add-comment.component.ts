import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FireBaseService, IActivities, ISubmissions, IUsers } from '../../services/fire-base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  public userList: IUsers[] = [];
  public submissionList: ISubmissions[] = [];
  public activityList: IActivities[] = [];
  isSignedIn = false;
  aID = localStorage.getItem("activityID");
  UID = localStorage.getItem("userUID");
  userRole = localStorage.getItem("userRole");
  sid = localStorage.getItem("submissionID");
  aTitle = localStorage.getItem("activityTitle");
  userSubName = localStorage.getItem("userSubmissionName");

  submission: ISubmissions = {
    aid:'',
    comment:'',
    datesubmit:'',
    filesubmit: '',
    uid: '',
    id:''
  }
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private fireBaseService: FireBaseService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getSubmissions();
    this.getActivities();
  }

  getUsers(): void{
    this.fireBaseService.getUsers().subscribe((res)=> {
      this.userList = res.map((user) => {
        return{
          ...user.payload.doc.data() as {},
          id: user.payload.doc.id
        } as IUsers;
      });
    });
  }

  getSubmissions(): void{
    this.fireBaseService.getSubmissions().subscribe((res)=> {
      this.submissionList = res.map((submission) => {
        return{
          ...submission.payload.doc.data() as {},
          id: submission.payload.doc.id
        } as ISubmissions;
      });
    });
  }

  getActivities(): void{
    this.fireBaseService.getActivities().subscribe((res)=> {
      this.activityList = res.map((activity) => {
        return{
          ...activity.payload.doc.data() as {},
          id: activity.payload.doc.id
        } as IActivities;
      });
    });
  }

  onSubmit(submission: ISubmissions){
    // localStorage.setItem('newComment', this.submission.comment)
    // console.log(this.submission.comment)
    // this.fireBaseService.updateComment()
    this.fireBaseService.updateComment(submission);
  }
}
