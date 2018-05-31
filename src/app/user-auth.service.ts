import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  private isLoginSubject = new BehaviorSubject<firebase.User>;

  constructor(public angularFireAuth: AngularFireAuth) {
    this.angularFireAuth.authState
      .subscribe((user: firebase.User) => {
        this.isLoginSubject.next(user);
      });
  }

  authUser(): Observable<firebase.User> {
    return this.isLoginSubject.asObservable();
  }

  login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    this.angularFireAuth.auth.signInWithPopup(provider).then(credential => {
      this.isLoginSubject.next(credential);
    });
  }

  logout() {
    this.angularFireAuth.auth.signOut();
    this.isLoginSubject.next(null);
    //this.router.navigate(['login']);
  }
}
