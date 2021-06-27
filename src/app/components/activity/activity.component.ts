import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FireBaseService, IActivities } from '../../services/fire-base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  
 // private form: FormGroup;

 public activityList: IActivities[] = [];

 // public activityDetails: IActivities;


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
       }as IActivities;
     });
   });
 }

//  download(){
//   // Create Book logic
//   this.router.navigate(['{{activity.file}}']);
// }

}
