import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-layiut',
  templateUrl: './main-layiut.component.html',
  styleUrls: ['./main-layiut.component.scss']
})
export class MainLayiutComponent {

  buttonValue = 'registration';

  constructor(
    public router: Router,
  ) {
    this.buttonValue = (this.router.url).slice(1);
    this.changeButtonName()
  }

  redirect() {
    this.router.navigate([`/${this.buttonValue}`]);
    this.changeButtonName();
  }

  changeButtonName() {
    if (this.buttonValue == 'registration') {
      this.buttonValue = 'login';
    } else {
      this.buttonValue = 'registration';
    }
  }

}
