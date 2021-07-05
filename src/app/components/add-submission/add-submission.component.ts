import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FireBaseService, IActivities, ISubmissions } from '../../services/fire-base.service';
import { Router } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from 'src/app/models/file-upload';
import { DatePipe } from '@angular/common';
import {formatDate } from '@angular/common';


@Component({
  selector: 'app-add-submission',
  templateUrl: './add-submission.component.html',
  styleUrls: ['./add-submission.component.css'],
  providers: [DatePipe]
})
export class AddSubmissionComponent implements OnInit {

  public userForm: FormGroup;
  isNameSelected: boolean;


  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;
  percentage = 0;

  today= new Date();
  todaysDataTime = '';

  downloadURL;
  activityID;

  submission: ISubmissions ={
    aid: '',
    comment: '',
    datesubmit: '',
    filesubmit: '',
    id: '',
    uid: '',
    
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

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  onSubmit(){
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
    this.fireBaseService.addSubmissions(this.submission);
    // this.activityID = localStorage.getItem("activityID");
    // this.fireBaseService.updateActivities(this.activityID, this.activity);
    
    this.submission.filesubmit = '';
    this.submission.datesubmit = '';
    this.router.navigate(['activity']); 
  }

}
