import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthenticationService} from './authentication.service';
import {map, take, tap} from 'rxjs/operators';
import {currentUser, adminsList} from '../environment';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable ({providedIn: 'root'})

export class AuthenticationGuard implements CanActivate{

  constructor(
    private dbAuth: AngularFireAuth,
    private router: Router,
    private auth: AuthenticationService,
    private database: AngularFireDatabase
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.currentUser.pipe(
      take(1),
      map(user => {
        if (user) {
          this.database.database.goOnline();
          currentUser.isAdmin = false;
          currentUser.currentUserName = (user['email'] == null) ? 'noname' : user['email'];
          adminsList.admins.forEach(admin => {
            if (user['email'] == admin) {
              currentUser.isAdmin = true;
            }
          });
        }
        return !!user;
      }),
      tap( loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/login']);
        }
      })
    );
  }

}
