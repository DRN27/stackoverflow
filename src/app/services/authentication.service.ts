import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {auth} from 'firebase';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {

  constructor(
    public router: Router,
    public dbAuth: AngularFireAuth,
    public ngZone: NgZone,
    private  database: AngularFireDatabase,
  ) {}

  get currentUser(): any {
    return this.dbAuth.authState;
  }

  signUp(email, password) {
    this.dbAuth.auth.createUserWithEmailAndPassword(email, password)
      .then( () => {
        this.router.navigate(['/home']).catch(err => alert(err));
      })
      .catch( error => {
        alert(error.message);
      })
  }

  signIn(email, password){
    this.dbAuth.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.router.navigate(['/home']);
      })
      .catch(err => {
        alert(err.message);
      });

  }

  signOut() {
    this.dbAuth.auth.signOut().then(() => {
      this.database.database.goOffline();
      this.router.navigate(['/login']);
    });
  }

  googleAuth() {
    this.googleProvider( new auth.GoogleAuthProvider() );
  }

  googleProvider(provider) {
     this.dbAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run( () => {
          this.router.navigate(['/home']);
        });
      }).catch((error) => {
        console.log(error);
      })
  }

  githubAuth() {
    this.githubProvider( new auth.GithubAuthProvider() );
  }

  githubProvider(provider) {
    this.dbAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run( () => {
          this.router.navigate(['/home']);
        });
      }).catch((error) => {
      console.log(error);
    })
  }

  twitterAuth() {
    this.twitterProvider( new auth.TwitterAuthProvider());
  }

  twitterProvider(provider) {
    this.dbAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run( () => {
          this.router.navigate(['/home']);
        } )
      }).catch((error) => {
      console.log(error);
    })
  }

}
