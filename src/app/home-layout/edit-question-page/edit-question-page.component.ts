import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import {QuestionsService} from '../../services/questions.service';
import {Question} from '../../interface';
import {tagsData} from '../../environment';

@Component({
  selector: 'app-edit-question-page',
  templateUrl: './edit-question-page.component.html',
  styleUrls: ['./edit-question-page.component.scss']
})
export class EditQuestionPageComponent {

  form: FormGroup;
  tagsData = tagsData.tagsData;
  question: Question;
  arrayOfTags: FormArray;

  constructor(
    public formBuilder: FormBuilder,
    private database: AngularFireDatabase,
    private router: Router,
    private questionsService: QuestionsService,
  ) {
    this.questionsService.allQuestions.subscribe(value => {
      const url = window.location.href.split('/');
      const id  = url[url.length - 1];
      let counter = 0;

      for (let key in value) {
        if (key === id) {
          this.question = value[id];
          counter = 1;
          break;
        }
      }
      if (counter == 0) {
        this.router.navigate(['home/allQuestions']);
      }

      this.form = this.formBuilder.group({
        title: new FormControl(this.question.title, [
          Validators.required
        ]),
        text: new FormControl(this.question.text, [
          Validators.required
        ]),
        arrayOfTags: this.formBuilder.array([], [
          Validators.required
        ])
      });

      this.arrayOfTags = this.form.get('arrayOfTags') as FormArray;

      if (this.question.tags) {
        this.tagsData.forEach(item => {
          item.checked = false;
          this.question.tags.forEach(tag => {
            if (item.value == tag) {
              item.checked = true;
              this.arrayOfTags.push(new FormControl(item.value));
            }
          });
        });
      }
    })

  }

  editQuestion() {
    const editQuestion: Question = {
      id: this.question.id,
      author: this.question.author,
      title: this.form.value.title,
      text: this.form.value.text,
      tags: this.form.value.arrayOfTags,
      date: this.question.date,
      isResolved: this.question.isResolved,
      isApproved:this.question.isApproved
    };

    if (this.question.comments) {
      editQuestion.comments = this.question.comments;
    }

    this.questionsService.editQuestion(editQuestion);
  }


  onCheckboxChange(e) {
    if (e.target.checked) {
      this.arrayOfTags.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      this.arrayOfTags.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          this.arrayOfTags.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  navigate() {
    this.router.navigate([`home/question/${this.question.id}`]);
  }


}
