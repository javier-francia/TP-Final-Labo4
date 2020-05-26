import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccessService } from '../Access/access.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilGuard implements CanActivate {
  constructor(private accessSvc: AccessService,
              private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let perfil = this.accessSvc.GetPerfil();
      let urlToLoad = next.url[0].path;
      let output = false;

      switch(perfil)
      {
        case "Paciente":
          if( urlToLoad == "PedirTurno" ||
              urlToLoad == "MisTurnos" ||
              urlToLoad == "Historial" ||
              urlToLoad == "Contacto")
          {
            output = true;
          }
        break;

        case "Profesional":
          if( urlToLoad == "Agenda" ||
              urlToLoad == "AtenderPaciente")
          {
            output = this.accessSvc.IsHabilitado();
          }
        break;

        case "Admin":
          if( urlToLoad == "AdminProfesionales" ||
              urlToLoad == "AdministradoresABM")
          {
            output = true;
          }
        break;
      }

      if(!output) this.router.navigate(['Error']);
      return output;
  }
  
}
