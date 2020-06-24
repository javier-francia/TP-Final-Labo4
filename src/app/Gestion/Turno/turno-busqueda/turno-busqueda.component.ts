import { Component, OnInit } from '@angular/core';
import { Turno } from '../turno';
import { TurnosServiceService } from '../turnos-service.service';
import { EncuestaDatosPaciente } from '../../Informe/encuesta-datos-paciente';
import { DatoPersonalizado } from '../../Informe/dato-personalizado';
import { fadeInFastAnimation } from '../../../animationsRoot';


@Component({
  selector: 'app-turno-busqueda',
  templateUrl: './turno-busqueda.component.html',
  styleUrls: ['./turno-busqueda.component.css'],
  animations: [ fadeInFastAnimation ],
  host: { '[@fadeInFastAnimation]': '' }
})
export class TurnoBusquedaComponent implements OnInit {

  readonly pageSize = 7;
  page: number = 1;

  tipoDatos = "";
  tituloModal ="";

  patronBusqueda = "";

  listadoTurnos: Array<Turno> = [];
  totalTurnos: Array<Turno> = [];
  
  turnoElegido: Turno;

  constructor(private turnosSvc: TurnosServiceService) { }

  ngOnInit(): void {

    let turnosObservable = this.turnosSvc.Get().subscribe((turnoSnapshot: any) => {
      for(let i = 0; i < turnoSnapshot.length; i++)
      {

        if (turnoSnapshot[i].payload.doc.data().estado != "Finalizado")
        {
          continue;
        }

        let turnoActual = new Turno();
        turnoActual.id = +turnoSnapshot[i].payload.doc.id;
        turnoActual.idPaciente = +turnoSnapshot[i].payload.doc.data().idPaciente;
        turnoActual.idProfesional = +turnoSnapshot[i].payload.doc.data().idProfesional;
        turnoActual.nombreCompletoPaciente = turnoSnapshot[i].payload.doc.data().nombreCompletoPaciente;
        turnoActual.nombreCompletoProfesional = turnoSnapshot[i].payload.doc.data().nombreCompletoProfesional;
        turnoActual.especialidad = turnoSnapshot[i].payload.doc.data().especialidad;
        turnoActual.inicio = new Date(turnoSnapshot[i].payload.doc.data().inicio.toDate());
        turnoActual.fin = new Date(turnoSnapshot[i].payload.doc.data().fin.toDate());
        turnoActual.fechaSacado = new Date(turnoSnapshot[i].payload.doc.data().fechaSacado.toDate());
        turnoActual.estado = turnoSnapshot[i].payload.doc.data().estado;
        turnoActual.resenia = turnoSnapshot[i].payload.doc.data().resenia;
        if(turnoSnapshot[i].payload.doc.data().datosPaciente != "")
        {
          let datosPacienteProv: EncuestaDatosPaciente  = JSON.parse(turnoSnapshot[i].payload.doc.data().datosPaciente);
          turnoActual.datosPaciente = datosPacienteProv;
        }

        this.totalTurnos.push(turnoActual);
      }
      this.totalTurnos = this.totalTurnos.sort((a, b) => b.inicio.getTime() - a.inicio.getTime());
      this.listadoTurnos = this.totalTurnos;
      turnosObservable.unsubscribe();
    });
    
  }

  VerDetalle(unTurno: Turno)
  {
    this.tipoDatos = "VerDetalle";
    this.tituloModal = "Detalle del turno";
    this.turnoElegido = unTurno;
    document.getElementById("btnModalDetalle").click();
  }

  VerResenia(unTurno: Turno)
  {
    this.tipoDatos = "VerResenia";
    this.tituloModal = "Reseña";
    this.turnoElegido = unTurno;
    document.getElementById("btnModalDetalle").click();
  }

  VerDatosPaciente(unTurno: Turno)
  {
    this.tipoDatos = "VerDatosPaciente";
    this.tituloModal = "Datos paciente";
    this.turnoElegido = unTurno;
    document.getElementById("btnModalDetalle").click();
  }


  buscarTurnos()
  {
    let patron = this.patronBusqueda.toLowerCase();

    if(patron === "")
    {
      this.listadoTurnos = this.totalTurnos;
    }
    else
    {
      //    Filtro por especialidad
      let filtroPorEspecialidad = this.totalTurnos.filter(function (turnoProvisorio) {
        return turnoProvisorio.especialidad.toLowerCase().includes(patron);
      });


      //    Filtro por dia
      let filtroPorDia = this.totalTurnos.filter(function (turnoProvisorio) {
        let dia = "";
        switch(turnoProvisorio.inicio.getDay())
        {
          case 1:
            dia = "lunes";
            break;
          case 2:
            dia = "martes";
            break;
          case 3:
            dia = "miercoles";
            break;
          case 4:
            dia = "jueves";
            break;
          case 5:
            dia = "viernes";
            break;
          case 6:
            dia = "sabado";
            break;
        }
        
        let diaMes = turnoProvisorio.inicio.getDate() + "/" + (turnoProvisorio.inicio.getMonth()+1);
        return dia.includes(patron) || diaMes.includes(patron);
      });

      // Filtro por nombre profesional
      let filtroProfesional = this.totalTurnos.filter((turnoProvisorio) => {
        return turnoProvisorio.nombreCompletoProfesional.toLowerCase().includes(patron);
      });

      // Filtro por nombre paciente + datos paciente genericos + datos paciente personalizados
      let filtroPacienteCompleto = this.totalTurnos.filter((turnoProvisorio: Turno) => {
        
        if(turnoProvisorio.datosPaciente != undefined)
        {
          if(turnoProvisorio.datosPaciente.edad.toString().includes(patron) ||
          turnoProvisorio.datosPaciente.altura.toString().includes(patron) ||
          turnoProvisorio.datosPaciente.peso.toString().includes(patron) ||
          turnoProvisorio.datosPaciente.presionArterial.includes(patron))
          {
            return true;
          }

          if(turnoProvisorio.datosPaciente.datosPersonalizados.length > 0)
          {
            for(let i = 0; i < turnoProvisorio.datosPaciente.datosPersonalizados.length; i++)
            {
              let objetoPersonalizado = turnoProvisorio.datosPaciente.datosPersonalizados[i];
              if(objetoPersonalizado.clave.toLowerCase().includes(patron) || objetoPersonalizado.valor.toLowerCase().includes(patron))
              {
                return true;
              }
            }
          }
        }

        if(turnoProvisorio.nombreCompletoPaciente.toLowerCase().includes(patron) || 
        turnoProvisorio.resenia.toLowerCase().includes(patron))
        {
          return true;
        }
        
        return false;
      });



      filtroPorEspecialidad = filtroPorEspecialidad.concat(filtroPorDia);
      filtroPorEspecialidad = filtroPorEspecialidad.concat(filtroProfesional);
      filtroPorEspecialidad = filtroPorEspecialidad.concat(filtroPacienteCompleto);


      let arrayOrdenado = filtroPorEspecialidad.sort((a, b) => b.inicio.getTime() - a.inicio.getTime());
      let arraySinDuplicados = this.uniq_fast(arrayOrdenado);

      this.listadoTurnos = arraySinDuplicados;
    }
  }



  uniq_fast(a: Array<Turno>) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = a[i];
         if(seen[item.id] !== 1) {
               seen[item.id] = 1;
               out[j++] = item;
         }
    }
    return out;
  }
}
