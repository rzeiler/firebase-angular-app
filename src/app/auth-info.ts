export class AuthInfo {

  constructor(public uid: string,public name: string) {

  }

  isLoggedIn() {
    return !!this.uid;
  }

}
