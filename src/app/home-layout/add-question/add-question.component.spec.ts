import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {AddQuestionComponent} from './add-question.component';
import {FormArray, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuillModule} from 'ngx-quill';
import {Router} from '@angular/router';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../environments/environment';
import {QuestionsService} from '../../services/questions.service';
import {By} from '@angular/platform-browser';

class RouterStub {
  navigate(path: any[]) {}
}

describe('AddQuestionComponent', () => {
  let component: AddQuestionComponent;
  let fixture: ComponentFixture<AddQuestionComponent>;
  let service: QuestionsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddQuestionComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        QuillModule.forRoot(),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireDatabaseModule,
      ],
      providers: [
        {provide: Router, useClass: RouterStub},
        QuestionsService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestionComponent);
    component = fixture.debugElement.componentInstance;
    service = TestBed.get(QuestionsService);

    fixture.detectChanges();
  });

  it('should call function from service', () => {
    const spy = spyOn(service, 'addQuestion');

    component.form.get('title').setValue('testTitle');
    component.form.get('text').setValue('testText');
    fixture.detectChanges();
    component.addQuestion();

    expect(spy).toHaveBeenCalledWith({
      id: '',
      author: '',
      title: 'testTitle',
      text: 'testText',
      tags: [],
      date: new Date().toString(),
      isResolved: false,
      isApproved: false
    });
  }) ;

  it('should navigate to allQuestions page', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    component.navigate();

    expect(spy).toHaveBeenCalled();
  });

  it ('should if checkbox is checked push it value on array', () => {
    const arrayOfTags: FormArray = component.form.get('arrayOfTags') as FormArray;
    const input1 = fixture.debugElement.query(By.css('.frontend') ).nativeElement;
    const input2 = fixture.debugElement.query(By.css('.java') ).nativeElement;

    input1.click();
    input2.click();

    expect(arrayOfTags.value).toEqual(['frontend', 'java']);
  });

  it ('should return empty array if double click on element', () => {
    const arrayOfTags: FormArray = component.form.get('arrayOfTags') as FormArray;
    const input1 = fixture.debugElement.query(By.css('.frontend') ).nativeElement;
    const input2 = fixture.debugElement.query(By.css('.salesforce') ).nativeElement;

    input1.click();
    input1.click();
    input2.click();

    expect(arrayOfTags.value).toEqual(['salesforce']);
  });

});
