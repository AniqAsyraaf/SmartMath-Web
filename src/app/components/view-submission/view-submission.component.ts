import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FireBaseService, IActivities, ISubmissions } from '../../services/fire-base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-submission',
  templateUrl: './view-submission.component.html',
  styleUrls: ['./view-submission.component.css']
})
export class ViewSubmissionComponent implements OnInit {

   
 // private form: FormGroup;

 public activityList: IActivities[] = [];
 public submissionList: ISubmissions[] = [];
 // public activityDetails: IActivities;
 isSignedIn = false;
 comment;
 filesubmit;
 datesubmit;
 aID = localStorage.getItem("activityID");
 UID = localStorage.getItem("userUID");
 userRole = localStorage.getItem("userRole");
 
 
 constructor(
   private fb: FormBuilder,
   private modalService: NgbModal,
   private fireBaseService: FireBaseService,
   private router: Router,
 ){}
 ngOnInit(): void{
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
 
 getActivity(activity: any){
  //  this.fireBaseService.getActivity(activity)
   localStorage.setItem('activityID', activity)
   console.log(activity)
   this.router.navigate(['/viewStudentSub']); 
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

 getSubDetail(activity){
  // localStorage.setItem('activityID', activity)
  // var submission = localStorage.getItem("userUID")
  // this.fireBaseService.getSubmission(submission)
  //  localStorage.setItem('activityID', activity)
  //  console.log(activity)
  localStorage.setItem('activityID', activity)
  for(var i=0; i<this.submissionList.length; i++)
    {
     
        if(this.submissionList[i].uid == this.UID)
        {
          if(this.submissionList[i].aid==activity)
          {
          localStorage.setItem("comment",this.submissionList[i].comment);
          this.comment = this.submissionList[i].comment;
          localStorage.setItem("datesubmit",this.submissionList[i].datesubmit);
          this.datesubmit = this.submissionList[i].datesubmit
          localStorage.setItem("filesubmit",this.submissionList[i].filesubmit);
          this.filesubmit = this.submissionList[i].filesubmit;
          break;
          }
        }
        else{
          localStorage.removeItem("comment")
          localStorage.removeItem("datesubmit")
          localStorage.removeItem("filesubmit")
          break;    
        }     
    }
   this.router.navigate(['/viewSubDetails']); 
 }
}

