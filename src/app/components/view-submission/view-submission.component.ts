import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FireBaseService, IActivities } from '../../services/fire-base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-submission',
  templateUrl: './view-submission.component.html',
  styleUrls: ['./view-submission.component.css']
})
export class ViewSubmissionComponent implements OnInit {

   
 // private form: FormGroup;

 public activityList: IActivities[] = [];

 // public activityDetails: IActivities;
 isSignedIn = false;

 constructor(
   private fb: FormBuilder,
   private modalService: NgbModal,
   private fireBaseService: FireBaseService
 ){}
 ngOnInit(): void{
   this.getActivities();
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
 
}

