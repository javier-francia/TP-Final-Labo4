import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccessService } from '../Access/access.service';
import { BrowserStorageService } from '../Access/browser-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PerfilGuard implements CanActivate {
  constructor(private accessSvc: AccessService,
              private browserStorageSvc: BrowserStorageService,
              private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let perfil = this.browserStorageSvc.GetPerfil();
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
              urlToLoad == "AtenderPaciente" ||
              urlToLoad == "HistorialProfesional" ||
              urlToLoad == "JornadasLaborales" ||
              urlToLoad == "BusquedaInformacion")
          {
            output = this.browserStorageSvc.IsHabilitado();
          }
        break;

        case "Admin":
          if( urlToLoad == "AdministradoresABM" ||
              urlToLoad == "HabilitarProfesional")
          {
            output = true;
          }
        break;
      }

      if(!output) this.router.navigate(['Error']);
      return output;
  }
  
}
