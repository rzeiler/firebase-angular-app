import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireAction, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';

import { UserAuthService } from '../user-auth.service';
import { AuthInfo } from "../auth-info";

import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

export class Item {
  size: string;
  text: string;
  isRight: boolean = false;
  timestamp: number;
}


@Component({
  selector: 'app-item-learn',
  templateUrl: './item-learn.component.html',
  styleUrls: ['./item-learn.component.css']
})
export class ItemLearnComponent implements OnInit {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  item = new Item();
  private myitems: any[];
  private step = 0;
  timestamp = Date.now();

countries: Observable<Item[]>;

  private myLIST: Observable<any[]>;

  constructor(public db: AngularFireDatabase, public userAuthService: UserAuthService) {
    userAuthService.authUser().subscribe((user: AuthInfo) => {
      if (user) {
        this.itemsRef = db.list(user.uid + '/items', ref => ref.orderByChild('timestamp').limitToLast(10));
        this.items = this.itemsRef.snapshotChanges().pipe(
          map(changes => {
            this.myitems = changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
            this.item = this.myitems[this.step];
            return this.myitems;
          })
        );
      } else {
        this.itemsRef = null;
        this.items = null;
      }
    });
  }

  validateItem(text: string, key: string) {
    console.log(this.item.text, text, key);
    if (this.item.text == text) {

      this.step = (this.myitems.length > (this.step + 1)) ? 0 : this.step + 1;


      console.log("myitems", this.myitems);
      this.item = this.myitems[this.step];

      this.updateLearnItem(key);
    }


  }

  updateLearnItem(key: string) {
    var timestamp = Date.now();
    this.itemsRef.update(key, { timestamp: timestamp });
  }

  ngOnDestroy() {
    this.itemsRef = null;
    this.items = null;
  }

  ngOnInit() { }

}
