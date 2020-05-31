import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AccessService } from '../../Access/access.service';
import { BrowserStorageService } from '../../Access/browser-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() modalRaised: EventEmitter<string> = new EventEmitter<string>();

  perfil: string;
  habilitado = false;

  constructor(private accessSvc: AccessService,
              private browserStorageSvc: BrowserStorageService,
              private router: Router) { }

  ngOnInit(): void {
    if(this.browserStorageSvc.ValidateLocalStorage())
    {
      this.perfil = this.browserStorageSvc.GetPerfil();
      this.habilitado = this.browserStorageSvc.IsHabilitado();

      if(!this.habilitado)
      {
        this.modalRaised.emit("Habilitado");
      }
      else
      {
        let miusuario = this.accessSvc.user.subscribe(res => {
          res.reload().then(() => {
            console.log(res);
            if(!res.emailVerified)
            {
              this.modalRaised.emit("Mail");
            }
            miusuario.unsubscribe();  
          });
        });
      }
    }
  }

  LogOut()
  {
    this.accessSvc.LogOut()
      .then(() => {
        this.browserStorageSvc.CleanLocalStorage();
        this.router.navigate(['']);
      })
      .catch();
  }

}
