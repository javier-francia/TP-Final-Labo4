import { Component, OnInit } from '@angular/core';
import { TurnosServiceService } from '../../../Gestion/Turno/turnos-service.service';
import { BrowserStorageService } from '../../../Access/browser-storage.service';
import { Turno } from '../../../Gestion/Turno/turno';
import { EncuestaDatosPaciente } from '../../../Gestion/Informe/encuesta-datos-paciente';

@Component({
  selector: 'app-paciente-historial',
  templateUrl: './paciente-historial.component.html',
  styleUrls: ['./paciente-historial.component.css']
})
export class PacienteHistorialComponent implements OnInit {

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
        if(turnoSnapshot[i].payload.doc.data().idPaciente != idPaciente)
        {
          continue;
        }
        
        if(turnoSnapshot[i].payload.doc.data().estado == "Pendiente" ||
        turnoSnapshot[i].payload.doc.data().estado == "Confirmado" )
        {
          continue;
        }

        let turnoActual = new Turno();
        turnoActual.idProfesional = turnoSnapshot[i].payload.doc.data().idProfesional;
        turnoActual.nombreCompletoProfesional = turnoSnapshot[i].payload.doc.data().nombreCompletoProfesional;
        turnoActual.especialidad = turnoSnapshot[i].payload.doc.data().especialidad;
        turnoActual.inicio = new Date(turnoSnapshot[i].payload.doc.data().inicio.toDate());
        turnoActual.fin = new Date(turnoSnapshot[i].payload.doc.data().fin.toDate());
        turnoActual.estado = turnoSnapshot[i].payload.doc.data().estado;
        turnoActual.resenia = turnoSnapshot[i].payload.doc.data().resenia;
        this.listadoTurnos.push(turnoActual);
      }
      this.listadoTurnos = this.listadoTurnos.sort((a, b) => a.inicio.getTime() - b.inicio.getTime());
      turnosObservable.unsubscribe();
    });
  }

  VerResenia(unTurno: Turno)
  {
    this.turnoElegido = unTurno;
    document.getElementById("btnModalResenia").click();
  }
}