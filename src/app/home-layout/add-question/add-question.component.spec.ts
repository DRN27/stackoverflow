import {AddQuestionComponent} from './add-question.component';
import {FormBuilder} from '@angular/forms';
import {QuestionsService} from '../../services/questions.service';
import {TestBed} from '@angular/core/testing';

describe('AddQuestionComponent', () => {
  let component: AddQuestionComponent;
  let questionsService: QuestionsService;

  beforeEach(() => {
    component = new AddQuestionComponent(new FormBuilder(), null, null, questionsService);
    questionsService = new QuestionsService(null, null, null);
    // questionsService = TestBed.get(QuestionsService);
  });

  it ('should create form with 3 controls', () => {
    expect( component.form.contains('title') ).toBeTruthy();
    expect( component.form.contains('text') ).toBeTruthy();
    expect( component.form.contains('arrayOfTags') ).toBeTruthy();
  });

  it('should mark controls as invalid if value is empty', () => {
    const title = component.form.get('title');
    const text = component.form.get('text');

    title.setValue('');
    text.setValue('');

    expect(title.valid).toBeFalsy();
    expect(text.valid).toBeFalsy();
  });

  // it('should mark arrayOfTags as invalid if value is empty', () => {
  //   const control = component.form.get('arrayOfTags');
  //
  //   control.setValue('');
  //
  //   expect(control.valid).toBeFalsy();
  // });

  it('should call function in service', () => {
   component.addQuestion = jasmine.createSpy('addQuestion');
   component.addQuestion();

    expect(questionsService.addQuestion).toHaveBeenCalled();
  });

});
