import { Component } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {

  auth: Observable<firebase.User>;

  constructor(public userAuthService: UserAuthService) {
    userAuthService.authUser().subscribe((fireuser: firebase.User) => {
      console.log("UserAuthComponent:", fireuser);
      this.auth = fireuser;
    });
  }

  login() {
    this.userAuthService.login();
  }

  logout() {
    this.userAuthService.logout();
  }



}
