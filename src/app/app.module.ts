import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { MainLayiutComponent } from './main-layout/main-layiut/main-layiut.component';
import { LoginFormComponent } from './main-layout/login-form/login-form.component';
import { RegistrationFormComponent } from './main-layout/registration-form/registration-form.component';
import { HomeLayoutComponent } from './home-layout/home-layout/home-layout.component';
import { AddQuestionComponent } from './home-layout/add-question/add-question.component';
import { AllQuestionsComponent } from './home-layout/all-questions/all-questions.component';
import { QuestionPageComponent } from './home-layout/question-page/question-page.component';
import {QuillModule} from 'ngx-quill';
import { EditQuestionPageComponent } from './home-layout/edit-question-page/edit-question-page.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { ModerationPipe } from './pipes/moderation.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainLayiutComponent,
    LoginFormComponent,
    RegistrationFormComponent,
    HomeLayoutComponent,
    AddQuestionComponent,
    AllQuestionsComponent,
    QuestionPageComponent,
    EditQuestionPageComponent,
    FilterPipe,
    SortPipe,
    ModerationPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    QuillModule.forRoot()
  ],
  providers: [
    AngularFireAuth,
    AuthenticationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
