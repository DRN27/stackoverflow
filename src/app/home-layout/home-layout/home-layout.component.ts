import {Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import {sortBar, currentUser} from '../../environment';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent {

  form: FormGroup;
  filters = false;
  sorts = false;
  settings = false;
  isGridView = true;
  viewValue = 'list';

  filtersData = (currentUser.isAdmin) ? sortBar.filtersForAdmin : sortBar.filtersForUser;
  sortData = sortBar.sorts;

  public arrayOfTags: Array<string> = [];
  getFilters$: Subject<any> = new Subject<any>();
  getSort$: Subject<any> = new Subject<any>();
  view$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    public auth: AuthenticationService,
  ){
    this.form = this.formBuilder.group({
      filter: this.formBuilder.array([]),
      sort: this.formBuilder.array([]),
    });

    this.isGridView = JSON.parse(sessionStorage.getItem('isGridView'));
    this.changeViewValue();
  }

  logout(event) {
    event.preventDefault();
    this.auth.signOut();
  }

  showFilters() {
    this.filters = !this.filters;
    this.sorts = this.settings = false;
  }

  showSorts() {
    this.sorts = !this.sorts;
    this.filters = this.settings = false;
  }

  showSettings() {
    this.settings = !this.settings;
    this.filters = this.sorts = false;
  }

  onCheckboxChange(e) {
    const arrayOfTags: FormArray = this.form.get('filter') as FormArray;

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
    this.arrayOfTags = arrayOfTags.value;
    this.getFilters$.next(this.arrayOfTags);
  }


  onRadioChange(e) {
    this.getSort$.next(e.target.value);
  }

  changeView() {
    this.isGridView = !this.isGridView;
    this.view$.next(this.isGridView);
    this.changeViewValue();
    sessionStorage.setItem('isGridView', this.isGridView.toString());
  }

  changeViewValue() {
    this.viewValue = (this.isGridView) ? 'list' : 'grid';
  }
}
