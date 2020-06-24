import { Component, OnInit } from '@angular/core';
import { TurnosServiceService } from '../../../Gestion/Turno/turnos-service.service';
import { BrowserStorageService } from '../../../Access/browser-storage.service';
import { Turno } from '../../../Gestion/Turno/turno';
import { Router } from '@angular/router';
import { fadeInFastAnimation } from '../../../animationsRoot';

@Component({
  selector: 'app-atender-paciente',
  templateUrl: './atender-paciente.component.html',
  styleUrls: ['./atender-paciente.component.css'],
  animations: [ fadeInFastAnimation ],
  host: { '[@fadeInFastAnimation]': '' }
})
export class AtenderPacienteComponent implements OnInit {

  readonly pageSize = 7;
  page: number = 1;

  listadoTurnos: Array<Turno>;
  turnoElegido: Turno;

  constructor(private turnosSvc: TurnosServiceService,
              private browserStorageSvc: BrowserStorageService,
              private router: Router) { }

  ngOnInit(): void {
    this.ObtenerTurnos();
  }

  onAtender(unTurno: Turno)
  {
    this.turnoElegido = unTurno;
    document.getElementById("btnModalAtender").click();
  }

  AtenderPaciente(elTurno: Turno)
  {
    document.getElementById("btnDescartaModal").click();
    this.turnoElegido = null;
    this.turnosSvc.UpdateAtencion(elTurno).then(() => {
      //this.ObtenerTurnos();
    }).catch();
  }

  ObtenerTurnos(): void
  {
    this.listadoTurnos = [];
    let idProfesional = this.browserStorageSvc.GetId();

    let turnosObservable = this.turnosSvc.Get().subscribe((turnoSnapshot: any) => {
      for(let i = 0; i < turnoSnapshot.length; i++)
      {
        if(turnoSnapshot[i].payload.doc.data().idProfesional != idProfesional)
        {
          continue;
        }

        if(turnoSnapshot[i].payload.doc.data().estado != "Confirmado")
        {
          continue;
        }

        let turnoActual = new Turno();
        turnoActual.id = turnoSnapshot[i].payload.doc.id;
        turnoActual.idProfesional = turnoSnapshot[i].payload.doc.data().idProfesional;
        turnoActual.idPaciente = turnoSnapshot[i].payload.doc.data().idPaciente;
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
  }

}