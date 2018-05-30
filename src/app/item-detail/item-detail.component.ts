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



    //this.itemsRef = db.list('/items');
    //afAuth.authState.subscribe((user: firebase.User) => this.currentUser = user);

    afAuth.authState.subscribe(authData => {
      let uid = authData.uid;

      this.itemsRef = db.list(   uid + '/items' );

    });

  }

  addItem(size: string | null, text: string | null) {
    this.itemsRef.push({ size: size, text: text });
  }
  updateItem(key: string, newText: string) {
    this.itemsRef.update(key, { text: newText });
  }
  deleteItem(key: string) {
    this.itemsRef.remove(key);
  }
  deleteEverything() {
    this.itemsRef.remove();
  }

  ngOnInit() {
  }

}
