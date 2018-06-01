import { Component } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { AuthInfo } from "../auth-info";

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent {

  auth: AuthInfo;

  constructor(public userAuthService: UserAuthService) {
    userAuthService.authUser().subscribe((user: AuthInfo) => {
      if (user.uid != null) {
        this.auth = user;
      }
    });
  }

  login() {
    this.userAuthService.login();
  }

  logout() {
    this.userAuthService.logout();
  }



}
