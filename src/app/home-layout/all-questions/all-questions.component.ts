import {Component} from '@angular/core';
import {QuestionsService} from '../../services/questions.service';
import {HomeLayoutComponent} from '../home-layout/home-layout.component';
import {currentUser} from '../../environment';


@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.scss']
})
export class AllQuestionsComponent {

  arrayOfTags;
  sort;
  isGridView = JSON.parse(sessionStorage.getItem('isGridView'));
  isAdmin = currentUser.isAdmin;

  constructor(
    public homeLayout: HomeLayoutComponent,
    public questionService: QuestionsService
  ) {

    this.homeLayout.getFilters$.subscribe( value => {
      this.arrayOfTags = value;
    });
    this.homeLayout.getSort$.subscribe(value => {
      this.sort = value;
    });
    this.homeLayout.view$.subscribe( value => {
      this.isGridView = value;
    });
  }


  approve(event) {
    const id = this.getId(event);
    this.questionService.approve(id);
  }

  delete(event) {
    const id = this.getId(event);
    this.questionService.delete(id);
  }

  getId(event) {
    return event.target.parentElement.parentElement.id;
  }
}
