import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FireBaseService, IActivities, ISubmissions, IUsers } from '../../services/fire-base.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-student-sub',
  templateUrl: './view-student-sub.component.html',
  styleUrls: ['./view-student-sub.component.css']
})
export class ViewStudentSubComponent implements OnInit {

  public userList: IUsers[] = [];
  public submissionList: ISubmissions[] = [];
  public activityList: IActivities[] = [];
  isSignedIn = false;
  aID = localStorage.getItem("activityID");
  UID = localStorage.getItem("userUID");
  userRole = localStorage.getItem("userRole");
  activityTitle;

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

  addComment(submission, username){
    localStorage.setItem('submissionID', submission);
    localStorage.setItem('userSubmissionName', username)
    
    for(var i=0; i<this.activityList.length; i++)
    {
      console.log(this.aID)
        if(this.activityList[i].id == this.aID)
        {
          console.log(this.activityList[i].id)
          localStorage.setItem("activityTitle",this.activityList[i].title);
          this.activityTitle = this.activityList[i].title;
          break;
          
        }  
    }

    this.router.navigate(['/addComment']); 

  }
}
