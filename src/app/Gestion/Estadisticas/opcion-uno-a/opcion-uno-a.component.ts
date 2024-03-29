import { Component, OnInit } from '@angular/core';
import { fadeInFastAnimation } from '../../../animationsRoot';
import { AccessLoggingService } from '../../../Access/access-logging.service';
import { AccessLog } from '../../../Access/access-log';
import { ElementoEstadistica } from '../elemento-estadistica';
import { ExcelService } from '../excel.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-opcion-uno-a',
  templateUrl: './opcion-uno-a.component.html',
  styleUrls: ['./opcion-uno-a.component.css'],
  animations: [ fadeInFastAnimation ],
  host: { '[@fadeInFastAnimation]': '' }
})
export class OpcionUnoAComponent implements OnInit {

  listo = false;

  dataSourceDias: Object;
  dataSourceHoras: Object;

  conjuntoElementosDias: Array<ElementoEstadistica> = [];
  conjuntoElementosHoras: Array<ElementoEstadistica> = [];

  conjuntoTodosLosPerfiles: Array<AccessLog> = [];
  conjuntoAdmin: Array<AccessLog> = [];
  conjuntoProfesionales: Array<AccessLog> = [];
  conjuntoPacientes: Array<AccessLog> = [];

  constructor(private accessLoggingSvc: AccessLoggingService,
              private excelSvc: ExcelService) { }



  ngOnInit(): void {

    let accessLogObservable = this.accessLoggingSvc.Get().subscribe((logSnapshot: any) => {


      // Armo array datos por hora (cada 6 horas)
      this.conjuntoElementosHoras.push(new ElementoEstadistica("0:00 a 5:59", "0"));
      this.conjuntoElementosHoras.push(new ElementoEstadistica("6:00 a 11:59", "0"));
      this.conjuntoElementosHoras.push(new ElementoEstadistica("12:00 a 17:59", "0"));
      this.conjuntoElementosHoras.push(new ElementoEstadistica("18:00 a 23:59", "0"));

      // Armo array datos por dia
      this.conjuntoElementosDias.push(new ElementoEstadistica("Domingo", "0"));
      this.conjuntoElementosDias.push(new ElementoEstadistica("Lunes", "0"));
      this.conjuntoElementosDias.push(new ElementoEstadistica("Martes", "0"));
      this.conjuntoElementosDias.push(new ElementoEstadistica("Miércoles", "0"));
      this.conjuntoElementosDias.push(new ElementoEstadistica("Jueves", "0"));
      this.conjuntoElementosDias.push(new ElementoEstadistica("Viernes", "0"));
      this.conjuntoElementosDias.push(new ElementoEstadistica("Sábado", "0"));



      for(let i = 0; i < logSnapshot.length; i++)
      {
        let log = new AccessLog();
        log.idUsuario = +logSnapshot[i].payload.doc.data().idUsuario;
        log.email = logSnapshot[i].payload.doc.data().email;
        log.datetime = new Date(logSnapshot[i].payload.doc.data().datetime.toDate());
        log.perfil = logSnapshot[i].payload.doc.data().perfil;
        this.conjuntoTodosLosPerfiles.push(log);
        
        // Conteo de registro por hora
        if(log.datetime.getHours() < 6)
        {
          let cantidad = +this.conjuntoElementosHoras[0].value + 1;
          this.conjuntoElementosHoras[0].value = cantidad.toString();
        }
        else if(log.datetime.getHours() >= 6 && log.datetime.getHours() < 12)
        {
          let cantidad = +this.conjuntoElementosHoras[1].value + 1;
          this.conjuntoElementosHoras[1].value = cantidad.toString();
        }
        else if(log.datetime.getHours() >= 12 && log.datetime.getHours() < 18)
        {
          let cantidad = +this.conjuntoElementosHoras[2].value + 1;
          this.conjuntoElementosHoras[2].value = cantidad.toString();
        }
        else
        {
          let cantidad = +this.conjuntoElementosHoras[3].value + 1;
          this.conjuntoElementosHoras[3].value = cantidad.toString();
        }

        // Conteo de registro por día
        let dia = log.datetime.getDay();

        let cantidad = +this.conjuntoElementosDias[dia].value + 1;
        this.conjuntoElementosDias[dia].value = cantidad.toString();
      }

      this.conjuntoTodosLosPerfiles = this.conjuntoTodosLosPerfiles.sort((a, b) => a.datetime.getTime() - b.datetime.getTime());

      this.conjuntoAdmin = this.conjuntoTodosLosPerfiles.filter(item => {
        return item.perfil == "Admin";
      });
      this.conjuntoProfesionales = this.conjuntoTodosLosPerfiles.filter(item => {
        return item.perfil == "Profesional";
      });
      this.conjuntoPacientes = this.conjuntoTodosLosPerfiles.filter(item => {
        return item.perfil == "Paciente";
      });



      for(let i = 0; i < 24; i++)
      {
        let elemento = new ElementoEstadistica(`${i} a ${i + 1}`,"");
      }


      const dataSourceDias = {
        chart: {
          caption: "Cantidad de accesos por días",
          xAxisName: "Día",
          yAxisName: "Cantidad",
          theme: "fusion",
          exportEnabled: 1
        },
        data: this.conjuntoElementosDias
      };
      this.dataSourceDias = dataSourceDias;

      const dataSourceHoras = {
        chart: {
          caption: "Cantidad de accesos por horarios (cada 6 horas)",
          xAxisName: "Franjas horarias",
          yAxisName: "Cantidad",
          theme: "fusion",
          exportEnabled: 1
        },
        data: this.conjuntoElementosHoras
      };
      this.dataSourceHoras = dataSourceHoras;

      this.listo = true;

      accessLogObservable.unsubscribe();
    });

  }

  export() {
    const wsTodos: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.conjuntoTodosLosPerfiles);
    const wsAdmin: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.conjuntoAdmin);
    const wsProfesionales: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.conjuntoProfesionales);
    const wsPacientes: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.conjuntoPacientes);
    
    let arrayWs = [];
    arrayWs.push(XLSX.utils.json_to_sheet(this.conjuntoTodosLosPerfiles));
    arrayWs.push(XLSX.utils.json_to_sheet(this.conjuntoAdmin));
    arrayWs.push(XLSX.utils.json_to_sheet(this.conjuntoProfesionales));
    arrayWs.push(XLSX.utils.json_to_sheet(this.conjuntoPacientes));
    
    let arrayNombres = [];
    arrayNombres.push("Todos");
    arrayNombres.push("Admin");
    arrayNombres.push("Profesional");
    arrayNombres.push("Paciente");
    
    
    this.excelSvc.exportToExcel(arrayWs, arrayNombres, "Historia logueo");
  }  
}