import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppNavComponent } from './app-nav/app-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActivityComponent } from './components/activity/activity.component';
// import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SubmissionComponent } from './components/submission/submission.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatInputModule } from '@angular/material/input';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewSubmissionComponent } from './components/view-submission/view-submission.component';
import { ModalComponent, ModalModule } from 'ngb-modal';
import { AddActivityComponent } from './components/add-activity/add-activity.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AddSubmissionComponent } from './components/add-submission/add-submission.component';


@NgModule({
  declarations: [
    AppComponent,
    AppNavComponent,
    ActivityComponent,
    RegisterComponent,
    ProfileComponent,
    SubmissionComponent,
    ChatroomComponent,
    ViewSubmissionComponent,
    AddActivityComponent,
    AddSubmissionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
    ModalModule,
    MatSelectModule,
    AngularFireAuthModule
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
