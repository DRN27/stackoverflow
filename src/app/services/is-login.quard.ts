import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsLoginQuard implements CanActivate{

  constructor(
    private dbAuth: AngularFireAuth,
    private router: Router,
    private auth: AuthenticationService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.currentUser.pipe(
      take(1),
      map(user => {
        if (!!user) {
          this.router.navigate(['/home']);
        } else {
          return true
        }
      })
    );
  }

}
