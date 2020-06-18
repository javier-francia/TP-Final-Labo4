import { Component, OnInit } from '@angular/core';
import { ElementoEstadistica } from '../elemento-estadistica';
import { TurnosServiceService } from '../../Turno/turnos-service.service';
import { ProfesionalesService } from '../../../Usuarios/Profesional/profesionales.service';

@Component({
  selector: 'app-opcion-dos-b',
  templateUrl: './opcion-dos-b.component.html',
  styleUrls: ['./opcion-dos-b.component.css']
})
export class OpcionDosBComponent implements OnInit {
  
  listo = false;

  dataSource: Object;

  conjuntoElementos: Array<ElementoEstadistica> = [];

  constructor(private turnosSvc: TurnosServiceService,
              private profesionalesSvc: ProfesionalesService) { }

  ngOnInit(): void {

    let profesionalesId: Array<number> = [];
    let profesionalesNombre: Array<string> = [];

    let profesionalesCount: Array<number> = [];

    let profesionalesObservable = this.profesionalesSvc.Get().subscribe((profesionalesSnapshot: any) => {
      for(let i = 0; i < profesionalesSnapshot.length; i++)
      {
        let unProfesional = profesionalesSnapshot[i];

        profesionalesId.push(+unProfesional.payload.doc.id);
        profesionalesNombre.push(unProfesional.payload.doc.data().nombre + " " + unProfesional.payload.doc.data().apellido);
        profesionalesCount.push(0);
      }

      let turnosObservable = this.turnosSvc.Get().subscribe((turnosSnapshot: any) => {
        for(let i = 0; i < turnosSnapshot.length; i++)
        {
          let unTurno = turnosSnapshot[i];

          let indiceId = profesionalesId.indexOf(+unTurno.payload.doc.data().idProfesional);
          console.log(indiceId);
          profesionalesCount[indiceId]++;
        }
        
        for(let i = 0; i < profesionalesNombre.length; i++)
        {
          this.conjuntoElementos.push(new ElementoEstadistica(profesionalesNombre[i], profesionalesCount[i].toString()));
        }
        //console.log(this.conjuntoElementos);

        const dataSource = {
          chart: {
            caption: "Cantidad de turnos por profesional",
            xAxisName: "Nombre del profesional",
            yAxisName: "Cantidad",
            theme: "fusion",
            exportEnabled: 1
          },
          data: this.conjuntoElementos
        };
        this.dataSource = dataSource;
        this.listo = true;

        turnosObservable.unsubscribe();
        profesionalesObservable.unsubscribe();
        });
    });
  }
}