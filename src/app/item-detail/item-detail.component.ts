import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { UserAuthService } from '../user-auth.service';
import { AuthInfo } from "../auth-info";

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  itemsRef: AngularFireList<any>;

  constructor(public db: AngularFireDatabase, public userAuthService: UserAuthService) {
    userAuthService.authUser().subscribe((user: AuthInfo) => {
      if (user.uid != null) {
        this.itemsRef = db.list(user.uid + '/items');
      }
    });
  }

  addItem(size: string | null, text: string | null) {
    var timestamp = Date.now();
    this.itemsRef.push({ size: size, text: text, timestamp: timestamp });
  }

  ngOnInit() {
  }

}
