import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase, AngularFireAction, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';

import { UserAuthService } from '../user-auth.service';
import { AuthInfo } from "../auth-info";

import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(public db: AngularFireDatabase, public userAuthService: UserAuthService) {
    userAuthService.authUser().subscribe((user: AuthInfo) => {
      if (user.uid != null) {
        this.itemsRef = db.list(user.uid + '/items');
        this.items = this.itemsRef.snapshotChanges().pipe(
          map(changes =>
            changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
          )
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
