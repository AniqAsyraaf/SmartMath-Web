import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FireBaseService, IActivities } from '../../services/fire-base.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

 userUID = localStorage.getItem("users")
 
 

 private form: FormGroup;

 public activityList: IActivities[];

 public activityDetails: IActivities;

 isSignedIn = false;

 
 constructor(
   private fb: FormBuilder,
   private modalService: NgbModal,
   private fireBaseService: FireBaseService,
   private router: Router,
   public afAuth: AngularFireAuth
 ){}
 ngOnInit(): void{
   this.getActivities();
   
   
 }

// getUid() {
//  return this.afAuth.currentUser;
// } 
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



//  update(id: string) {
//   this.fireBaseService.updateActivities(id);
//  }

//  delete(id: string) {
//   this.fireBaseService.deleteActivities(id);
//  }

 redirect(){
  this.router.navigate(['/addActivity']);
 }

}
