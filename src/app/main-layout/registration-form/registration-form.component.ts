import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    public router: Router,
    public authenticationService: AuthenticationService,
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(null,[
        Validators.minLength(6),
        Validators.required
      ])
    })
  }

  signUp() {
    const email = this.form.controls['email'].value;
    const password = this.form.controls['password'].value;
    this.authenticationService.signUp(email, password);
  }

}
