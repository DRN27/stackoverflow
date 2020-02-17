import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import {Question} from '../../interface';
import {QuestionsService} from '../../services/questions.service';
import {tagsData, currentUser} from '../../environment';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent {

  form: FormGroup;
  tagsData = tagsData.tagsData;

  constructor(
    private formBuilder: FormBuilder,
    private database: AngularFireDatabase,
    private router: Router,
    private questionsService: QuestionsService
  ) {
    this.form = this.formBuilder.group({
      title: new FormControl(null, [
        Validators.required
      ]),
      text: new FormControl(null, [
        Validators.required
      ]),
      arrayOfTags: this.formBuilder.array([], [
        Validators.required
      ])
    })
  }

  addQuestion() {
    const newQuestion: Question = {
      id: '',
      author: currentUser.currentUserName,
      title: this.form.value.title,
      text: this.form.value.text,
      tags: this.form.value.arrayOfTags,
      date: new Date().toString(),
      isResolved: false,
      isApproved: false
    };

    this.questionsService.addQuestion(newQuestion);

  }

  onCheckboxChange(e) {
    const arrayOfTags: FormArray = this.form.get('arrayOfTags') as FormArray;

    if (e.target.checked) {
      arrayOfTags.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      arrayOfTags.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          arrayOfTags.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

}
