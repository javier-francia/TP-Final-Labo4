import { Component, OnInit } from '@angular/core';
import { JornadaService } from '../../Administracion/JornadaTrabajo/jornada.service';
import { ElementoEstadistica } from '../elemento-estadistica';
import { fadeInFastAnimation } from '../../../animationsRoot';
import { ExcelService } from '../excel.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-opcion-dos-c',
  templateUrl: './opcion-dos-c.component.html',
  styleUrls: ['./opcion-dos-c.component.css'],
  animations: [ fadeInFastAnimation ],
  host: { '[@fadeInFastAnimation]': '' }
})
export class OpcionDosCComponent implements OnInit {

  listo = false;

  dataSource: Object;

  conjuntoElementos: Array<ElementoEstadistica> = [];

  constructor(private jornadaSvc: JornadaService,
              private excelSvc: ExcelService) { }

  ngOnInit(): void {

    let profesionalesDias: Array<number> = [1, 2, 3, 4, 5, 6];

    let profesionalesCount: Array<number> = [0, 0, 0, 0, 0, 0];

    let jornadaObservable = this.jornadaSvc.GetProfesionalJornada().subscribe((jornadaSnapshot: any) => {
      for(let i = 0; i < jornadaSnapshot.length; i++)
      {
        let unaJornadaTrabajador = jornadaSnapshot[i];
        
        if(unaJornadaTrabajador.payload.doc.data().jornadas.length == 0)
        {
          continue;
        }

        let unaListaJornadas = unaJornadaTrabajador.payload.doc.data().jornadas;
        for(let j = 0; j < unaListaJornadas.length; j++)
        {
          let unaJornada = JSON.parse((unaListaJornadas)[j]);

          profesionalesCount[+unaJornada.dia - 1]++;
        }
      }
      
      for(let i = 0; i < profesionalesDias.length; i++)
        {
          let nombreDia = "";
          switch(profesionalesDias[i])
          {
            case 1:
              nombreDia = "Lunes";
              break;
            case 2:
              nombreDia = "Martes";
              break;
            case 3:
              nombreDia = "Miércoles";
              break;
            case 4:
              nombreDia = "Jueves";
              break;
            case 5:
              nombreDia = "Viernes";
              break;
            case 6:
              nombreDia = "Sábado";
              break;
          }
          this.conjuntoElementos.push(new ElementoEstadistica(nombreDia, profesionalesCount[i].toString()));
        }

        const dataSource = {
          chart: {
            caption: "Cantidad de profesionales por día",
            xAxisName: "Nombre del profesional",
            yAxisName: "Cantidad",
            theme: "fusion",
            exportEnabled: 1
          },
          data: this.conjuntoElementos
        };
        this.dataSource = dataSource;
        this.listo = true;
  
        jornadaObservable.unsubscribe();

      
    });
  }

  export() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.conjuntoElementos);
    
    this.excelSvc.exportToExcel([ws], ["Datos"], "Cantidad de profesionales por dia");
  }  

}
