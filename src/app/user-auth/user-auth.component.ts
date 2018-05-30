import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
  providers: [AngularFireAuth]
})
export class UserAuthComponent implements OnInit {

  private currentUser: firebase.User;

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);
  }

  login() {
    var provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).then(credential => {
      // manage credentials
      console.log(credential);
    }).catch(error => {
      console.log(error.message);
    });
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  ngOnInit() {
  }

}
