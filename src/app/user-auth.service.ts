import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { BehaviorSubject, Observable } from "rxjs";

import { AuthInfo } from "./auth-info";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  static UNKNOWN_USER = new AuthInfo(null, null);

  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(UserAuthService.UNKNOWN_USER);

  constructor(public angularFireAuth: AngularFireAuth) {
    this.angularFireAuth.authState
      .subscribe((user: firebase.User) => {
        if (user != null) {
          this.authInfo$.next(new AuthInfo(user.uid, user.displayName));
        }
      });
  }

  authUser(): Observable<AuthInfo> {
    return this.authInfo$.asObservable();
  }

  login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    this.angularFireAuth.auth.signInWithPopup(provider).then(credential => {
      this.authInfo$.next(new AuthInfo(credential.uid, credential.displayName));
    });
  }

  logout() {
    this.angularFireAuth.auth.signOut();
    this.authInfo$.next(UserAuthService.UNKNOWN_USER);
    //this.router.navigate(['login']);
  }
}
