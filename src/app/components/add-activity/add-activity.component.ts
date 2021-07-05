import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FireBaseService, IActivities } from '../../services/fire-base.service';
import { Router } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from 'src/app/models/file-upload';
import { DatePipe } from '@angular/common';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css'],
  providers: [DatePipe]
})

export class AddActivityComponent implements OnInit {
  public userForm: FormGroup;
  isNameSelected: boolean;


  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;

  today= new Date();
  todaysDataTime = '';

  downloadURL;
  activityID;

  //Activity
  activity: IActivities ={
    id: '',
    title: '',
    description: '',
    category: '',
    date: '',
    file: '',
    uid: '',
    tutorialdate: '',
  }
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private fireBaseService: FireBaseService,
    private router: Router,
    public formBuilder: FormBuilder,
    private storage : AngularFireStorage,
    private datePipe: DatePipe,
  ) {
    this.todaysDataTime = formatDate(this.today, 'yyyy-MM-dd HH:mm aa ', 'en-US');
    localStorage.setItem("activityDate", this.todaysDataTime);
   }
  
  private basePath = '/files';

  ngOnInit(): void {
  }

  selectInput(event) {
    let selected = event.target.value;
    if (selected == "Turorial") {
      this.isNameSelected = true;
    } else {
      this.isNameSelected = false;
    }
  }

  onSubmit(){
    
    
    localStorage.setItem('activityTitle', this.activity.title)
    localStorage.setItem('activityDescription', this.activity.description)
    localStorage.setItem('activityCategory', this.activity.category)
    localStorage.setItem('activityTutoDate', this.activity.tutorialdate)

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.fireBaseService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
    this.fireBaseService.addActivities(this.activity);
    // this.activityID = localStorage.getItem("activityID");
    // this.fireBaseService.updateActivities(this.activityID, this.activity);
    
    this.activity.title = '';
    this.activity.description = '';
    this.activity.category = '';
    this.activity.tutorialdate = '';
    this.activity.id = '';
    this.activity.file = '';
    this.activity.date = ''
    this.router.navigate(['activity']); 
  }

  //File
  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

}
