import { Component } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'learn db';

  constructor(private userAuthService: UserAuthService) {

userAuthService.authUser().subscribe(u => {

    console.log("AppComponent:", u);
});






  }



}
