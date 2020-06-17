import { Component, OnInit } from '@angular/core';
import { TurnosServiceService } from '../../../Gestion/Turno/turnos-service.service';
import { BrowserStorageService } from '../../../Access/browser-storage.service';
import { Turno } from '../../../Gestion/Turno/turno';
import { Router } from '@angular/router';
import { Notificacion } from '../../../Navegacion/notificacion';
import { NotificacionService } from '../../../Navegacion/notificacion.service';

@Component({
  selector: 'app-profesional-agenda',
  templateUrl: './profesional-agenda.component.html',
  styleUrls: ['./profesional-agenda.component.css']
})
export class ProfesionalAgendaComponent implements OnInit {


  readonly pageSize = 7;
  page: number = 1;

  listadoTurnos: Array<Turno>;
  turnoElegido: Turno;
  notificacionNewId: number;

  constructor(private turnosSvc: TurnosServiceService,
              private browserStorageSvc: BrowserStorageService,
              private notificacionSvc: NotificacionService) { }

  ngOnInit(): void {
    this.listadoTurnos = [];
    let idPaciente = this.browserStorageSvc.GetId();

    let turnosObservable = this.turnosSvc.Get().subscribe((turnoSnapshot: any) => {
      for(let i = 0; i < turnoSnapshot.length; i++)
      {
        if(turnoSnapshot[i].payload.doc.data().idProfesional != idPaciente)
        {
          continue;
        }

        if(turnoSnapshot[i].payload.doc.data().estado != "Pendiente" &&
        turnoSnapshot[i].payload.doc.data().estado != "Confirmado" )
        {
          continue;
        }

        let turnoActual = new Turno();
        turnoActual.id = turnoSnapshot[i].payload.doc.id;
        turnoActual.idPaciente = +turnoSnapshot[i].payload.doc.data().idPaciente;
        turnoActual.idProfesional = +turnoSnapshot[i].payload.doc.data().idProfesional;
        turnoActual.nombreCompletoPaciente = turnoSnapshot[i].payload.doc.data().nombreCompletoPaciente;
        turnoActual.nombreCompletoProfesional = turnoSnapshot[i].payload.doc.data().nombreCompletoProfesional;
        turnoActual.especialidad = turnoSnapshot[i].payload.doc.data().especialidad;
        turnoActual.inicio = new Date(turnoSnapshot[i].payload.doc.data().inicio.toDate());
        turnoActual.fin = new Date(turnoSnapshot[i].payload.doc.data().fin.toDate());
        turnoActual.estado = turnoSnapshot[i].payload.doc.data().estado;
        this.listadoTurnos.push(turnoActual);
      }
      this.listadoTurnos = this.listadoTurnos.sort((a, b) => a.inicio.getTime() - b.inicio.getTime());
      turnosObservable.unsubscribe();
    });

    this.obtenerNuevoIdNotificacion();
  }

  onAceptar(unTurno: Turno)
  {
    this.turnoElegido = unTurno;
    document.getElementById("btnModalAceptar").click();
  }

  onRechazar(unTurno: Turno)
  {
    this.turnoElegido = unTurno;
    document.getElementById("btnModalRechazar").click();
  }

  onCancelar(unTurno: Turno)
  {
    this.turnoElegido = unTurno;
    document.getElementById("btnModalCancelar").click();
  }

  aceptarTurno()
  {
    let idPaciente = this.browserStorageSvc.GetId();
    this.turnoElegido.estado = "Confirmado";
    this.turnosSvc.UpdateEstado(this.turnoElegido).then(() =>{
      let notificacion = new Notificacion();
      notificacion.id = this.notificacionNewId;
      notificacion.fecha = new Date(Date.now());
      notificacion.idUsuario = this.turnoElegido.idPaciente;
      notificacion.leido = false;
      notificacion.contenido = `Su turno del día ${this.turnoElegido.inicio.getDate()}/${this.turnoElegido.inicio.getMonth()} con ${this.turnoElegido.nombreCompletoProfesional} fue ${this.turnoElegido.estado.toLowerCase()}.`;
      console.log(notificacion);
      this.notificacionSvc.Insert(notificacion).then().catch();
    });
  }

  rechazarTurno()
  {
    let idPaciente = this.browserStorageSvc.GetId();
    this.turnoElegido.estado = "Rechazado";
    this.turnosSvc.UpdateEstado(this.turnoElegido).then(() =>{
      let notificacion = new Notificacion();
      notificacion.id = this.notificacionNewId;
      notificacion.fecha = new Date(Date.now());
      notificacion.idUsuario = this.turnoElegido.idPaciente;
      notificacion.leido = false;
      notificacion.contenido = `Su turno del día ${this.turnoElegido.inicio.getDate()}/${this.turnoElegido.inicio.getMonth()} con ${this.turnoElegido.nombreCompletoProfesional} fue ${this.turnoElegido.estado.toLowerCase()}.`;
      console.log(notificacion);
      this.notificacionSvc.Insert(notificacion).then().catch();
    });
  }

  cancelarTurno()
  {
    let idPaciente = this.browserStorageSvc.GetId();
    this.turnoElegido.estado = "Cancelado";
    this.turnosSvc.UpdateEstado(this.turnoElegido).then(() =>{
      let notificacion = new Notificacion();
      notificacion.id = this.notificacionNewId;
      notificacion.fecha = new Date(Date.now());
      notificacion.idUsuario = this.turnoElegido.idPaciente;
      notificacion.leido = false;
      notificacion.contenido = `Su turno del día ${this.turnoElegido.inicio.getDate()}/${this.turnoElegido.inicio.getMonth()} con ${this.turnoElegido.nombreCompletoProfesional} fue ${this.turnoElegido.estado.toLowerCase()}.`;
      console.log(notificacion);
      this.notificacionSvc.Insert(notificacion).then().catch();
    });
  }

  obtenerNuevoIdNotificacion()
  {
    this.notificacionSvc.Get().subscribe((notificacionSnapshot) => {
      this.notificacionNewId = notificacionSnapshot.length + 1
    });
  }
}