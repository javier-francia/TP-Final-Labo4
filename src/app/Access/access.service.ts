import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class AccessService {

  localStorageKey = "ClinicaOnline";
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

  LoadLocalStorage(email: string, perfil: string, habilitado: boolean)
  {
    let objeto = {
      email: email,
      perfil: perfil,
      habilitado: habilitado
    };
    let encrypted = CryptoJS.AES.encrypt(JSON.stringify(objeto), environment.encryptionKey);
​    localStorage.setItem(this.localStorageKey, encrypted.toString());
  }

  // True si el usuario coincide con las credenciales
  ValidateLocalStorage() : boolean
  {
    if (localStorage.getItem(this.localStorageKey) !== undefined && localStorage.getItem(this.localStorageKey) !== null)
    {
      let usuario = this.GetUsuarioLocalStorage();
      this.GetCurrentUser().then(user => {
        if(user.email !== usuario.email)
        {
          localStorage.removeItem(this.localStorageKey);
          this.LogOut();
          return false;
        }
      });
    }
    else
    {
      this.LogOut();
      return false;
    }
    return true;
  }

  private GetUsuarioLocalStorage() : any
  {
    return JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem(this.localStorageKey), environment.encryptionKey).toString(CryptoJS.enc.Utf8));
  }

  GetPerfil() : string
  {
    return this.GetUsuarioLocalStorage().perfil;
  }

  GetEmail() : string
  {
    return this.GetUsuarioLocalStorage().email;
  }

  IsHabilitado() : boolean
  {
    return this.GetUsuarioLocalStorage().habilitado;
  }

  CleanLocalStorage()
  {
    localStorage.removeItem(this.localStorageKey);
  }
}
