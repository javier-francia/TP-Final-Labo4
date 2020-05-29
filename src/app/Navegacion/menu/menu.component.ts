import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccessService } from '../../Access/access.service';
import { Router } from '@angular/router';


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
              private router: Router) { }

  ngOnInit(): void {
    if(this.accessSvc.ValidateLocalStorage())
    {
      this.perfil = this.accessSvc.GetPerfil();
      this.habilitado = this.accessSvc.IsHabilitado();

      if(!this.habilitado)
      {
        this.modalRaised.emit("Habilitado");
      }
      else
      {
        this.accessSvc.GetCurrentUser().then()
        let miusuario = this.accessSvc.user.subscribe(res => {
          res.reload().then(() => {
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
        this.accessSvc.CleanLocalStorage();
        this.router.navigate(['']);
      })
      .catch();
  }

}
