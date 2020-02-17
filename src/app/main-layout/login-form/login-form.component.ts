import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    public authenticationService: AuthenticationService,
    public  router: Router
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

  SignIn() {
    const email = this.form.controls['email'].value;
    const password = this.form.controls['password'].value;
    this.authenticationService.signIn(email, password);
  }

}
