import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FireBaseService, ISubmissions } from '../../services/fire-base.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {

  public submissionList: ISubmissions[] = [];
  isSignedIn = false;
  
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private fireBaseService: FireBaseService) { }

  ngOnInit(): void{
    this.getSubmissions();
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
}