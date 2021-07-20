import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FireBaseService, IActivities, ISubmissions } from '../../services/fire-base.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-view-sub-details',
  templateUrl: './view-sub-details.component.html',
  styleUrls: ['./view-sub-details.component.css']
})
export class ViewSubDetailsComponent implements OnInit {

  public activityList: IActivities[] = [];
  public submissionList: ISubmissions[] = [];
  isSignedIn = false;
  userRole = localStorage.getItem("userRole");
  aID = localStorage.getItem("activityID");
  UID = localStorage.getItem("userUID");
  comment = localStorage.getItem("comment");
  datesubmit = localStorage.getItem("datesubmit");
  filesubmit = localStorage.getItem("filesubmit");
  today= new Date();
  todaysDataTime = formatDate(this.today, 'yyyy-MM-dd HH:mm aa ', 'en-US');
  // localStorage.setItem("lastDate",todaysDataTime);

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private fireBaseService: FireBaseService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getActivities();
    this.getSubmissions();
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

  getSubDetail(){
      var submission = localStorage.getItem("userUID")
      this.fireBaseService.getSubmission(submission)
      //  localStorage.setItem('activityID', activity)
      //  console.log(activity)
       this.router.navigate(['/viewSubDetails']); 
  }

  getActivity(activity: any){
  //  this.fireBaseService.getActivity(activity)
    localStorage.setItem('activityID', activity)
    console.log(activity)
    this.router.navigate(['/addSubmission']); 
  }
}
