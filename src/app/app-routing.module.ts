import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainLayiutComponent} from './main-layout/main-layiut/main-layiut.component';
import {LoginFormComponent} from './main-layout/login-form/login-form.component';
import {RegistrationFormComponent} from './main-layout/registration-form/registration-form.component';
import {HomeLayoutComponent} from './home-layout/home-layout/home-layout.component';
import {AuthenticationGuard} from './services/authentication.guard';
import {AddQuestionComponent} from './home-layout/add-question/add-question.component';
import {AllQuestionsComponent} from './home-layout/all-questions/all-questions.component';
import {QuestionPageComponent} from './home-layout/question-page/question-page.component';
import {EditQuestionPageComponent} from './home-layout/edit-question-page/edit-question-page.component';
import {IsLoginQuard} from './services/is-login.quard';


const routes: Routes = [
  {
    path: '', component: MainLayiutComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginFormComponent, canActivate: [IsLoginQuard]},
      {path: 'registration', component: RegistrationFormComponent, canActivate: [IsLoginQuard]},
    ]
  },
  { path: 'home', component: HomeLayoutComponent, children: [
      {path: '', redirectTo: 'allQuestions', pathMatch: 'full'},
      {path: 'allQuestions', component: AllQuestionsComponent},
      {path: 'addQuestion', component: AddQuestionComponent},
      {path: 'question/:id', component: QuestionPageComponent},
      {path: 'editQuestion/:id', component: EditQuestionPageComponent}
    ], canActivate: [AuthenticationGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
