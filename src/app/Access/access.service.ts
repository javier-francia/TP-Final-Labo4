import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccessService {
  user: Observable<firebase.User>;

  constructor(private fireAuth: AngularFireAuth) {
    this.user = this.fireAuth.authState;
  }


  RegisterWithEmail(email: string, pass: string)
  {
    return this.fireAuth.createUserWithEmailAndPassword(email, pass);
  }

  LoginWithEmail(email: string, pass: string)
  {
    return this.fireAuth.signInWithEmailAndPassword(email, pass);
  }

  LogOut(): Promise<void>
  {
    return this.fireAuth.signOut();
  }

  GetCurrentUser(): Promise<firebase.User>
  {
    return this.fireAuth.currentUser;
  }

}
