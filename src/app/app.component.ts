import { Component } from '@angular/core';

import { UserAuthService } from './user-auth.service';
import { AuthInfo } from "./auth-info";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'learn db';
  name = '';

  constructor(public auth: UserAuthService) {
    auth.authUser().subscribe((user: AuthInfo) => {
      if (user != null) {
        this.name = user.name;
      }
    });
  }

}
