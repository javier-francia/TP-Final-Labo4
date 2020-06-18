import { Component, OnInit } from '@angular/core';
import { TurnosServiceService } from '../../../Gestion/Turno/turnos-service.service';
import { BrowserStorageService } from '../../../Access/browser-storage.service';
import { Turno } from '../../../Gestion/Turno/turno';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profesional-historial',
  templateUrl: './profesional-historial.component.html',
  styleUrls: ['./profesional-historial.component.css']
})
export class ProfesionalHistorialComponent implements OnInit {

  readonly pageSize = 7;
  page: number = 1;

  listadoTurnos: Array<Turno>;
  turnoElegido: Turno;

  constructor(private turnosSvc: TurnosServiceService,
              private browserStorageSvc: BrowserStorageService) { }

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

        if(turnoSnapshot[i].payload.doc.data().estado == "Pendiente" ||
        turnoSnapshot[i].payload.doc.data().estado == "Confirmado" )
        {
          continue;
        }

        let turnoActual = new Turno();
        turnoActual.id = turnoSnapshot[i].payload.doc.id;
        turnoActual.idProfesional = turnoSnapshot[i].payload.doc.data().idProfesional;
        turnoActual.nombreCompletoProfesional = turnoSnapshot[i].payload.doc.data().nombreCompletoProfesional;
        turnoActual.nombreCompletoPaciente = turnoSnapshot[i].payload.doc.data().nombreCompletoPaciente;
        turnoActual.especialidad = turnoSnapshot[i].payload.doc.data().especialidad;
        turnoActual.inicio = new Date(turnoSnapshot[i].payload.doc.data().inicio.toDate());
        turnoActual.fin = new Date(turnoSnapshot[i].payload.doc.data().fin.toDate());
        turnoActual.estado = turnoSnapshot[i].payload.doc.data().estado;
        turnoActual.resenia = turnoSnapshot[i].payload.doc.data().resenia;
        if(turnoSnapshot[i].payload.doc.data().datosPaciente != "")
        {
          turnoActual.datosPaciente = JSON.parse(turnoSnapshot[i].payload.doc.data().datosPaciente);
        }
        if(turnoSnapshot[i].payload.doc.data().datosProfesional != "")
        {
          turnoActual.datosProfesional = JSON.parse(turnoSnapshot[i].payload.doc.data().datosProfesional);
        }
        this.listadoTurnos.push(turnoActual);
      }
      this.listadoTurnos = this.listadoTurnos.sort((a, b) => a.inicio.getTime() - b.inicio.getTime());
      turnosObservable.unsubscribe();
    });
  }

  onVerEncuesta(unTurno: Turno)
  {
    this.turnoElegido = unTurno;
    document.getElementById("btnModalEncuesta").click();
  }
}