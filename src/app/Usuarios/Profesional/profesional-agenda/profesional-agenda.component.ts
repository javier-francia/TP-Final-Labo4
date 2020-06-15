import { Component, OnInit } from '@angular/core';
import { TurnosServiceService } from '../../../Gestion/Turno/turnos-service.service';
import { BrowserStorageService } from '../../../Access/browser-storage.service';
import { Turno } from '../../../Gestion/Turno/turno';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profesional-agenda',
  templateUrl: './profesional-agenda.component.html',
  styleUrls: ['./profesional-agenda.component.css']
})
export class ProfesionalAgendaComponent implements OnInit {

  listadoTurnos: Array<Turno>;
  turnoElegido: Turno;

  constructor(private turnosSvc: TurnosServiceService,
              private browserStorageSvc: BrowserStorageService,
              private router: Router) { }

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
        turnoActual.idProfesional = turnoSnapshot[i].payload.doc.data().idProfesional;
        turnoActual.nombreCompletoPaciente = turnoSnapshot[i].payload.doc.data().nombreCompletoPaciente;
        turnoActual.especialidad = turnoSnapshot[i].payload.doc.data().especialidad;
        turnoActual.inicio = new Date(turnoSnapshot[i].payload.doc.data().inicio.toDate());
        turnoActual.fin = new Date(turnoSnapshot[i].payload.doc.data().fin.toDate());
        turnoActual.estado = turnoSnapshot[i].payload.doc.data().estado;
        this.listadoTurnos.push(turnoActual);
      }
      this.listadoTurnos = this.listadoTurnos.sort((a, b) => a.inicio.getTime() - b.inicio.getTime());
      turnosObservable.unsubscribe();
    });
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
    });
  }

  rechazarTurno()
  {
    let idPaciente = this.browserStorageSvc.GetId();
    this.turnoElegido.estado = "Rechazado";
    this.turnosSvc.UpdateEstado(this.turnoElegido).then(() =>{
    });
  }

  cancelarTurno()
  {
    let idPaciente = this.browserStorageSvc.GetId();
    this.turnoElegido.estado = "Cancelado";
    this.turnosSvc.UpdateEstado(this.turnoElegido).then(() =>{
    });
  }
}