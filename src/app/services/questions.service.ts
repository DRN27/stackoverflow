import {ChangeDetectorRef, Injectable, NgZone, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class QuestionsService {

  public questionObs: Observable<any[]>;
  public questionsArray: Array<object>;
  public id: string;
  public allQuestions: Observable<object>;
  public question;
  public questionId;

  constructor(
    private  database: AngularFireDatabase,
    private router: Router,
    public ngZone: NgZone,
  ) {
    this.questionObs = this.database.list('questions').valueChanges();
    this.questionObs.subscribe(value => {
      this.questionsArray = value;
      for (let item of value) {
        item['date'] = new Date(item['date']);
      }

    });

    this.allQuestions = new Observable(sub => {
      this.database.database.ref('questions').on('value', value => {
        sub.next(value.val());
      });
    });
  }

  addQuestion(question) {
    this.database.list('/questions').push(question)
      .then( data => {
        let key = data.key;
        this.database.database.ref(`questions/${key}`)
          .update({'id': key});
        this.ngZone.run(() => {
          this.router.navigate([`home/question/${key}`]);
        });
      });
  }

  showQuestion(event) {
    if (event.target.className == 'question_title' ) {
      this.id = event.currentTarget.id;
      this.ngZone.run(() => {
        this.router.navigate([`home/question/${this.id}`]);
      });

    }
  }

  editQuestion(question) {
    this.database.database.ref(`questions/${question.id}`)
      .update(question);

    this.router.navigate([`home/question/${question.id}`])
  }

  addComment(comment) {
    this.allQuestions.subscribe(value => {
      const url = window.location.href.split('/');
      this.questionId = url[url.length - 1];
      this.question = value[this.questionId];
    });

    let arrayOfComments:Array<object> = this.question.comments;
    if (arrayOfComments) {
      arrayOfComments.push(comment);
      this.database.database.ref(`questions/${this.questionId}/comments`)
        .update(arrayOfComments);
    } else {
      this.database.database.ref(`questions/${this.questionId}/comments`)
        .update({'0': comment});
    }
  }

  resolveQuestion(id) {
    const url = window.location.href.split('/');
    this.questionId = url[url.length - 1];

    this.database.database.ref(`questions/${this.questionId}/`)
      .update({'isResolved': true});
    this.database.database.ref(`questions/${this.questionId}/comments/${id}`)
      .update({'isChecked': true});
  }

  unresolveQuestion(id) {
    const url = window.location.href.split('/');
    this.questionId = url[url.length - 1];

    this.database.database.ref(`questions/${this.questionId}/`)
      .update({'isResolved': false});
    this.database.database.ref(`questions/${this.questionId}/comments/${id}`)
      .update({'isChecked': false});
  }

  approve(id) {
    this.database.database.ref(`questions/${id}`)
      .update({'isApproved': true});
  }

  delete(id) {
    this.database.database.ref(`questions/${id}`)
      .remove();
  }

}
