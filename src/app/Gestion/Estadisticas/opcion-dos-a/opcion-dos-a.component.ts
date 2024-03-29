import { Component, OnInit } from '@angular/core';
import { ElementoEstadistica } from '../elemento-estadistica';
import { TurnosServiceService } from '../../Turno/turnos-service.service';
import { fadeInFastAnimation } from '../../../animationsRoot';
import { ExcelService } from '../excel.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-opcion-dos-a',
  templateUrl: './opcion-dos-a.component.html',
  styleUrls: ['./opcion-dos-a.component.css'],
  animations: [ fadeInFastAnimation ],
  host: { '[@fadeInFastAnimation]': '' }
})
export class OpcionDosAComponent implements OnInit {

  listo = false;

  dataSource: Object;

  conjuntoElementos: Array<ElementoEstadistica> = [];

  constructor(private turnoSvc: TurnosServiceService,
              private excelSvc: ExcelService) { }

  ngOnInit(): void {

    let turnosLunesCount = 0;
    let turnosMartesCount = 0;
    let turnosMiercolesCount = 0;
    let turnosJuevesCount = 0;
    let turnosViernesCount = 0;
    let turnosSabadoCount = 0;

    let turnosObservable = this.turnoSvc.Get().subscribe((turnoSnapshot: any) => {
      for(let i = 0; i < turnoSnapshot.length; i++)
      {
        let fechaTurno = new Date(turnoSnapshot[i].payload.doc.data().inicio.toDate());
        switch(fechaTurno.getDay())
        {
          case 1:
            turnosLunesCount++;
            break;
          case 2:
            turnosMartesCount++;
            break;
          case 3:
            turnosMiercolesCount++;
            break;
          case 4:
            turnosJuevesCount++;
            break;
          case 5:
            turnosViernesCount++;
            break;
          case 6:
            turnosSabadoCount++;
            break;
        }
      }

      this.conjuntoElementos.push(new ElementoEstadistica("Lunes", turnosLunesCount.toString()));
      this.conjuntoElementos.push(new ElementoEstadistica("Martes", turnosMartesCount.toString()));
      this.conjuntoElementos.push(new ElementoEstadistica("Miercoles", turnosMiercolesCount.toString()));
      this.conjuntoElementos.push(new ElementoEstadistica("Jueves", turnosJuevesCount.toString()));
      this.conjuntoElementos.push(new ElementoEstadistica("Viernes", turnosViernesCount.toString()));
      this.conjuntoElementos.push(new ElementoEstadistica("Sabado", turnosSabadoCount.toString()));

      const dataSource = {
        chart: {
          caption: "Cantidad de turnos por día de la semana",
          xAxisName: "Día",
          yAxisName: "Cantidad",
          theme: "fusion",
          exportEnabled: 1
        },
        data: this.conjuntoElementos
      };
      this.dataSource = dataSource;
      this.listo = true;
      turnosObservable.unsubscribe();
    });
  }

  export() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.conjuntoElementos);
    
    this.excelSvc.exportToExcel([ws], ["Datos"], "Cantidad de turnos por dia");
  }  
}