import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AccessService } from '../../Access/access.service';
import { BrowserStorageService } from '../../Access/browser-storage.service';
import { Notificacion } from '../notificacion';
import { NotificacionService } from '../notificacion.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() modalRaised: EventEmitter<string> = new EventEmitter<string>();

  listadoNotificaciones: Array<Notificacion> = [];

  perfil: string;
  habilitado = false;
  idUsuario: number;

  constructor(private accessSvc: AccessService,
              private browserStorageSvc: BrowserStorageService,
              private router: Router,
              private notificacionSvc: NotificacionService) { }

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
            if(!res.emailVerified)
            {
              this.modalRaised.emit("Mail");
              this.habilitado = false;
            }
            miusuario.unsubscribe();  
          });
        });
      }
      this.idUsuario = this.browserStorageSvc.GetId();
      if(this.perfil == "Paciente")
      {
        this.obtenerNotificaciones();      
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

  obtenerNotificaciones()
  {
    this.listadoNotificaciones = [];
    let notificacionObservable = this.notificacionSvc.Get().subscribe((notificacionSnapshot: any) => {
      
      for(let i = 0; i < notificacionSnapshot.length; i++)
      {
        let notificacionActual = notificacionSnapshot[i];
        if(notificacionActual.payload.doc.data().idUsuario != this.idUsuario)
        {
          continue;
        }

        if(notificacionActual.payload.doc.data().leido as unknown as boolean)
        {
          continue;
        }

        let agregarNotificacion = new Notificacion();
        agregarNotificacion.id = +notificacionActual.payload.doc.id;
        agregarNotificacion.contenido = notificacionActual.payload.doc.data().contenido;
        agregarNotificacion.fecha = new Date(notificacionActual.payload.doc.data().fecha.toDate());

        this.listadoNotificaciones.push(agregarNotificacion);
      }
      this.listadoNotificaciones = this.listadoNotificaciones.sort((a, b) => a.fecha.getTime() - b.fecha.getTime());

      if(this.listadoNotificaciones.length > 0)
      {
        //document.getElementById("btnNotificacion").classList.value = "nav-link btn btn-warning";
        document.getElementById("btnNotificacion").classList.add("btn-warning");
      }
      
      notificacionObservable.unsubscribe();
    });
  }

  leerNotificaciones()
  {
    for(let i = 0; i < this.listadoNotificaciones.length; i++)
    {
      let notificacionActual = this.listadoNotificaciones[i];
      notificacionActual.leido = true;
      this.notificacionSvc.UpdateLectura(notificacionActual).then().catch(err => {
        console.log(err);
      });
    }
    
    if(document.getElementById("btnNotificacion").classList.contains("btn-warning"))
    {
      document.getElementById("btnNotificacion").classList.remove("btn-warning");
    }
  }
}
