import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireAction, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css'],
  providers: [AngularFireAuth]
})
export class ItemDetailComponent implements OnInit {

  private currentUser: firebase.User;
  itemsRef: AngularFireList<any>;


  constructor(public db: AngularFireDatabase, public afAuth: AngularFireAuth) {

    afAuth.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.itemsRef = db.list(user.uid + '/items');
      }
    });

  }

  addItem(size: string | null, text: string | null) {
    this.itemsRef.push({ size: size, text: text });
  }

  ngOnInit() {
  }

}
