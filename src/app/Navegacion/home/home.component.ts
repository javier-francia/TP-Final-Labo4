import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessService } from '../../Access/access.service';
import { BrowserStorageService } from '../../Access/browser-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  modal:string;
  error:string;

  constructor(public accessSvc: AccessService,
              private browserStorageSvc: BrowserStorageService,
              private router: Router) { }

  ngOnInit(): void {}

  LogOut()
  {
    this.accessSvc.LogOut()
      .then(() => {
        this.browserStorageSvc.CleanLocalStorage();
        this.router.navigate(['']);
      })
      .catch();
  }

  OnModalRaised(id: string)
  {
    this.modal = id;
  }

  ReSendVerificationMail()
  {
    let usuario = this.accessSvc.user.subscribe(user => {
      user.reload().then(() => {
        user.sendEmailVerification()
        .then(this.modal = undefined)
        .catch(() => {
          this.error = "Ocurrió un error al intentar enviar el correo de validación. Intente nuevamente más tarde.";
          document.getElementById("btnModalError").click();
        });
      });
    });
  }
}