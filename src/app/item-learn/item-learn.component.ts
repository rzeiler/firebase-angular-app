import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireAction, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';

import { UserAuthService } from '../user-auth.service';
import { AuthInfo } from "../auth-info";

import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-item-learn',
  templateUrl: './item-learn.component.html',
  styleUrls: ['./item-learn.component.css']
})
export class ItemLearnComponent implements OnInit {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  size: string = "";

  timestamp = Date.now();

  constructor(public db: AngularFireDatabase, public userAuthService: UserAuthService) {
    userAuthService.authUser().subscribe((user: AuthInfo) => {
      if (user) {
        this.itemsRef = db.list(user.uid + '/items', ref => ref.orderByChild('timestamp').limitToLast(10));
        this.items = this.itemsRef.snapshotChanges().pipe(
          map(changes => {
            let data = changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
            return data;
          })
        );
      } else {
        this.itemsRef = null;
        this.items = null;
      }
    });
  }



  updateListItem(key: string, newText: string, newSize: string) {
    var timestamp = Date.now();
    this.itemsRef.update(key, { text: newText, size: newSize, timestamp: timestamp }).then(() => alert("Update!"));
  }
  deleteItem(key: string) {
    if (confirm("Wollen sie den datensatz wirklich löschen?")) {
      this.itemsRef.remove(key);
    }
  }

  ngOnDestroy() {
    this.itemsRef = null;
    this.items = null;
  }

  ngOnInit() { }

}
