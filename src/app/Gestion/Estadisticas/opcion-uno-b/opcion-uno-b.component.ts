import { Component, OnInit } from '@angular/core';
import { ElementoEstadistica } from '../elemento-estadistica';
import { TurnosServiceService } from '../../Turno/turnos-service.service';
import { ProfesionalesService } from '../../../Usuarios/Profesional/profesionales.service';
import { EspecialidadService } from '../../../Shared/Servicios/especialidad.service';

@Component({
  selector: 'app-opcion-uno-b',
  templateUrl: './opcion-uno-b.component.html',
  styleUrls: ['./opcion-uno-b.component.css']
})
export class OpcionUnoBComponent implements OnInit {

  listo = false;

  dataSource: Object;

  conjuntoElementos: Array<ElementoEstadistica> = [];

  constructor(private turnosSvc: TurnosServiceService,
              private especialidadSvc: EspecialidadService) { }

  ngOnInit(): void {

    let especialidades: Array<string> = [];
    let especialidadesCount: Array<number> = [];


    let especialidadObservable = this.especialidadSvc.Get().subscribe((especialidadesSnapshot: any) => {
      for(let i = 0; i < especialidadesSnapshot.length; i++)
      {
        let unaEspecialidad = especialidadesSnapshot[i];

        especialidades.push(unaEspecialidad.payload.doc.data().nombre);
        especialidadesCount.push(0);
      }

      let turnosObservable = this.turnosSvc.Get().subscribe((turnosSnapshot: any) => {
        for(let i = 0; i < turnosSnapshot.length; i++)
        {
          let unTurno = turnosSnapshot[i];

          let indiceId = especialidades.indexOf(unTurno.payload.doc.data().especialidad);
          especialidadesCount[indiceId]++;
        }
        
        for(let i = 0; i < especialidades.length; i++)
        {
          this.conjuntoElementos.push(new ElementoEstadistica(especialidades[i], especialidadesCount[i].toString()));
        }
        //console.log(this.conjuntoElementos);

        const dataSource = {
          chart: {
            caption: "Cantidad de turnos por especialidad",
            xAxisName: "Especialidad",
            yAxisName: "Cantidad",
            theme: "fusion",
            exportEnabled: 1
          },
          data: this.conjuntoElementos
        };
        this.dataSource = dataSource;
        this.listo = true;

        turnosObservable.unsubscribe();
        especialidadObservable.unsubscribe();
        });
    });
  }
}