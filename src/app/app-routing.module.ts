import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';
import { ActivityComponent } from './components/activity/activity.component';
import { AddActivityComponent } from './components/add-activity/add-activity.component';
import { AddCommentComponent } from './components/add-comment/add-comment.component';
import { AddSubmissionComponent } from './components/add-submission/add-submission.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
// import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { SubmissionComponent } from './components/submission/submission.component';
import { ViewStudentSubComponent } from './components/view-student-sub/view-student-sub.component';
import { ViewSubDetailsComponent } from './components/view-sub-details/view-sub-details.component';
import { ViewSubmissionComponent } from './components/view-submission/view-submission.component';

const routes: Routes = [
  // {path: 'login', component:LoginComponent},
  //{path: 'register', component:RegisterComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'activity', component:ActivityComponent},
  {path: 'submission', component:SubmissionComponent},
  {path: 'chatroom', component:ChatroomComponent},
  {path: 'viewSubmission', component:ViewSubmissionComponent},
  {path: 'addActivity', component:AddActivityComponent},
  {path: 'addSubmission', component:AddSubmissionComponent},
  {path: 'viewSubDetails', component:ViewSubDetailsComponent},
  {path: 'viewStudentSub', component:ViewStudentSubComponent},
  {path: 'addComment', component:AddCommentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
