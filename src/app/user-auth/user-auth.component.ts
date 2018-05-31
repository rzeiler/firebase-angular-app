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
    userAuthService.authUser().subscribe((fireuser: AuthInfo) => {
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
