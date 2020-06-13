import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../environments/environment.prod';
import { AccessService } from './access.service';

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {

  storageKey = "ClinicaOnline";
  localStorageSetted: boolean;

  constructor(private accessSvc: AccessService) { }

  LoadLocalStorage(email: string, perfil: string, habilitado: boolean, id:number, storageType: boolean)
  {
    this.localStorageSetted = storageType;

    let objeto = {
      email: email,
      perfil: perfil,
      habilitado: habilitado,
      id: id
    };
    let encrypted = CryptoJS.AES.encrypt(JSON.stringify(objeto), environment.encryptionKey);

    if (this.localStorageSetted) localStorage.setItem(this.storageKey, encrypted.toString());
    else if (!this.localStorageSetted) sessionStorage.setItem(this.storageKey, encrypted.toString());
  }

  // True si el usuario coincide con las credenciales
  ValidateLocalStorage() : boolean
  {
    this.CheckStorageSetted();

    if (this.localStorageSetted === null)
    {
      this.accessSvc.LogOut();
      return false;
    }
    else if (this.localStorageSetted)
    {
      let usuario = this.GetUsuarioStorage();
      this.accessSvc.GetCurrentUser().then(user => {
        if(user.email !== usuario.email)
        {
          localStorage.removeItem(this.storageKey);
          this.accessSvc.LogOut();
          return false;
        }
      });
    }
    else if (!this.localStorageSetted)
    {
      let usuario = this.GetUsuarioStorage();
      this.accessSvc.GetCurrentUser().then(user => {
        if(user.email !== usuario.email)
        {
          sessionStorage.removeItem(this.storageKey);
          this.accessSvc.LogOut();
          return false;
        }
      });
    }

    return true;
  }

  private GetUsuarioStorage() : any
  {
    if (this.localStorageSetted) return JSON.parse(CryptoJS.AES.decrypt(localStorage.getItem(this.storageKey), environment.encryptionKey).toString(CryptoJS.enc.Utf8));
    else if (!this.localStorageSetted) return JSON.parse(CryptoJS.AES.decrypt(sessionStorage.getItem(this.storageKey), environment.encryptionKey).toString(CryptoJS.enc.Utf8));
    else return null;
  }

  GetPerfil() : string
  {
    return this.GetUsuarioStorage().perfil;
  }

  GetEmail() : string
  {
    return this.GetUsuarioStorage().email;
  }

  IsHabilitado() : boolean
  {
    return this.GetUsuarioStorage().habilitado;
  }

  GetId() : number
  {
    return this.GetUsuarioStorage().id;
  }

  CleanLocalStorage()
  {
    localStorage.removeItem(this.storageKey);
    sessionStorage.removeItem(this.storageKey);
  }

  private CheckStorageSetted()
  {
    if (sessionStorage.getItem(this.storageKey) !== undefined && sessionStorage.getItem(this.storageKey) !== null)
    {
      this.localStorageSetted = false;
    }
    else if (localStorage.getItem(this.storageKey) !== undefined && localStorage.getItem(this.storageKey) !== null)
    {
      this.localStorageSetted = true;
    }
    else
    {
      this.localStorageSetted = null;
    }
  }
}
