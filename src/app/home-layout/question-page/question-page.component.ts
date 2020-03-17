import {Component} from '@angular/core';
import {QuestionsService} from '../../services/questions.service';
import {Question} from '../../interface';
import {currentUser} from '../../environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-question-page',
  templateUrl: './question-page.component.html',
  styleUrls: ['./question-page.component.scss']
})
export class QuestionPageComponent {

  public question: Question;
  public commentText;
  isAdmin = currentUser.isAdmin;
  isAuthor;

  constructor(
    public questionsService: QuestionsService,
    public router: Router,
  ) {
    this.questionsService.allQuestions.subscribe(value => {
      const url = window.location.href.split('/');
      const id  = url[url.length - 1];

      for (let key in value) {
        if (key === id) {
          this.question = value[id];
          this.isAuthor = (this.question.author == currentUser.currentUserName);
          break;
        }
      }

      if (!this.question) {
        this.router.navigate(['home/allQuestions']);
      }
    });
  }

  addAnswer() {
    const comment = {
      'author': currentUser.currentUserName,
      'date': new Date(),
      'text': this.commentText,
      'isChecked': false
    };

    this.questionsService.addComment(comment);
    this.commentText = null;
  }

  editQuestion() {
    this.router.navigate([`home/editQuestion/${this.question.id}`]);
  }

  onCheckboxChange(e) {
    const commentId = e.target.id.slice(7);

    if (e.target.checked) {
      this.questionsService.resolveQuestion(commentId);
    } else {
      this.questionsService.unresolveQuestion(commentId);
    }
  }

  approve(obj) {
    const id = obj.question.id;
    this.questionsService.approve(id);
  }

  delete(obj) {
    const id = obj.question.id;
    this.questionsService.delete(id);
  }
}
