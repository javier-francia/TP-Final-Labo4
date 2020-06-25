import { Component, OnInit } from '@angular/core';
import { ElementoEstadistica } from '../elemento-estadistica';
import { TurnosServiceService } from '../../Turno/turnos-service.service';
import { ProfesionalesService } from '../../../Usuarios/Profesional/profesionales.service';
import { EspecialidadService } from '../../../Shared/Servicios/especialidad.service';
import { fadeInFastAnimation } from '../../../animationsRoot';
import { ExcelService } from '../excel.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-opcion-uno-b',
  templateUrl: './opcion-uno-b.component.html',
  styleUrls: ['./opcion-uno-b.component.css'],
  animations: [ fadeInFastAnimation ],
  host: { '[@fadeInFastAnimation]': '' }
})
export class OpcionUnoBComponent implements OnInit {

  listo = false;

  dataSource: Object;

  conjuntoElementos: Array<ElementoEstadistica> = [];

  turnosEspecialidad: Array<Object> = [];

  constructor(private turnosSvc: TurnosServiceService,
              private especialidadSvc: EspecialidadService,
              private excelSvc: ExcelService) { }

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

          this.turnosEspecialidad.push({
            IdTurno: +unTurno.payload.doc.id,
            Fecha: new Date(unTurno.payload.doc.data().inicio.toDate()),
            Especialidad: unTurno.payload.doc.data().especialidad,
            Profesional: unTurno.payload.doc.data().nombreCompletoProfesional,
            Estado: unTurno.payload.doc.data().estado
          });
        }
        
        for(let i = 0; i < especialidades.length; i++)
        {
          this.conjuntoElementos.push(new ElementoEstadistica(especialidades[i], especialidadesCount[i].toString()));
        }

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

  export() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.turnosEspecialidad);
    
    this.excelSvc.exportToExcel([ws], ["Datos"], "Operaciones por especialidad");
  }  
}