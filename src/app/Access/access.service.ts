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


  RegisterWithEmail(email: string, pass: string) : Promise<firebase.auth.UserCredential>
  {
    return this.fireAuth.createUserWithEmailAndPassword(email, pass);
  }

  LoginWithEmail(email: string, pass: string) : Promise<firebase.auth.UserCredential>
  {
    return this.fireAuth.signInWithEmailAndPassword(email, pass);
  }

  LogOut() : Promise<void>
  {
    return this.fireAuth.signOut();
  }

  GetCurrentUser() : Promise<firebase.User>
  {
    return this.fireAuth.currentUser;
  }

  ResetPassword(email: string) : Promise<void>
  {
    return this.fireAuth.sendPasswordResetEmail(email);
  }

  DeleteUser() : any
  {
    let user = this.fireAuth.currentUser;
    user
      .then(res => {
        return res.delete()
          .then(() => {return true;})
          .catch(() => {return false;}); // Implementar
      })
      .catch(() => {return false;});
  }
}
