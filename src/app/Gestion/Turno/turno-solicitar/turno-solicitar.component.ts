import { Component, OnInit } from '@angular/core';
import { TurnosServiceService } from '../turnos-service.service';
import { Turno } from '../turno';
import { JornadaService } from '../../Administracion/JornadaTrabajo/jornada.service';
import { ProfesionalJornada } from '../../Administracion/JornadaTrabajo/profesional-jornada';
import { Jornada } from '../../Administracion/JornadaTrabajo/jornada';
import { GestorDeTurnosService } from '../gestor-de-turnos.service';
import { Profesional } from '../../../Usuarios/Profesional/profesional';
import { ProfesionalesService } from '../../../Usuarios/Profesional/profesionales.service';

@Component({
  selector: 'app-turno-solicitar',
  templateUrl: './turno-solicitar.component.html',
  styleUrls: ['./turno-solicitar.component.css']
})
export class TurnoSolicitarComponent implements OnInit {

  obtenerTurnosTerminado = false;
  listadoTurnosVivos: Array<Turno>;
  obtenerJornadasTerminado = false;
  listadoJornadasTrabajo: Array<ProfesionalJornada>;
  listadoTurnosParaSolicitar: Array<Turno> = null;
  listadoProfesionales: Array<Profesional>

  patronBusqueda = "";
  
  constructor(private turnosSvc: TurnosServiceService,
              private jornadaSvc: JornadaService,
              private gestorDeTurnosSvc: GestorDeTurnosService,
              private profesionalSvc: ProfesionalesService) { }

  ngOnInit(): void {
    this.listadoProfesionales = [];
    this.listadoTurnosVivos = [];
    this.listadoJornadasTrabajo = [];
    this.obtenerTurnosVivos();
    this.obtenerJornadasTrabajo();
    this.obtenerProfesionales();
  }


  obtenerTurnosVivos()
  {
    this.obtenerTurnosTerminado = false;
    let turnosObservable = this.turnosSvc.Get().subscribe((turnoSnapshot: any) => {
      
      for(let i = 0; i < turnoSnapshot.length; i++)
      {
        if(turnoSnapshot[i].payload.doc.data().estado != "Pendiente" &&
        turnoSnapshot[i].payload.doc.data().estado != "Confirmado" )
        {
          continue;
        }

        let turnoActual = new Turno();
        turnoActual.idProfesional = turnoSnapshot[i].payload.doc.data().idProfesional;
        turnoActual.inicio = new Date(turnoSnapshot[i].payload.doc.data().inicio.toDate());
        turnoActual.fin = new Date(turnoSnapshot[i].payload.doc.data().fin.toDate());
        this.listadoTurnosVivos.push(turnoActual);
      }
      this.obtenerTurnosTerminado = true;
      //console.log("Listado de turnos vivos: ");
      //console.log(this.listadoTurnosVivos);
      turnosObservable.unsubscribe();
    });
  }

  obtenerJornadasTrabajo()
  {
    this.obtenerJornadasTerminado = false;
    let jornadasObservable = this.jornadaSvc.GetProfesionalJornada().subscribe((jornadaSnapshot: any) => {

      for(let i = 0; i < jornadaSnapshot.length; i++)
      {
        let profJornada = new ProfesionalJornada();
        profJornada.id_profesional = jornadaSnapshot[i].payload.doc.data().id_profesional;
        let arrayJornadasString: Array<string> = jornadaSnapshot[i].payload.doc.data().jornadas;
        for(let j = 0; j < arrayJornadasString.length; j++)
        {
          let jornada = new Jornada();
          let jotaSon = JSON.parse(arrayJornadasString[j]);
          jornada.dia = jotaSon.dia;
          jornada.especialidad = jotaSon.especialidad;
          jornada.horario = jotaSon.horario;
          jornada.duracion = jotaSon.duracion;
          profJornada.jornadas.push(jornada);
        }
        this.listadoJornadasTrabajo.push(profJornada);
      }
      this.obtenerJornadasTerminado = true;
      //console.log("Listado de jornadas: ");
      //console.log(this.listadoJornadasTrabajo);
      jornadasObservable.unsubscribe();
    });
  }

  obtenerProfesionales()
  {
    let profesionalesObservable = this.profesionalSvc.Get().subscribe((profesionalSnapshot) => {
      profesionalSnapshot.forEach((element: any) => {
        let profesional = new Profesional();
        profesional.id = element.payload.doc.id as unknown as number;
        profesional.nombre = element.payload.doc.data().nombre;
        profesional.apellido = element.payload.doc.data().apellido;
        this.listadoProfesionales.push(profesional);
      });
      profesionalesObservable.unsubscribe();
    });
  }

  buscarTurnos()
  {
    let patron = this.patronBusqueda.toLowerCase();
    let listadoProvisorioTurnos = this.gestorDeTurnosSvc.listarTurnosDisponibles(this.listadoTurnosVivos, this.listadoJornadasTrabajo);
    if(this.patronBusqueda === "")
    {
      this.listadoTurnosParaSolicitar = listadoProvisorioTurnos;
    }
    else
    {
      let filtroPorEspecialidad = listadoProvisorioTurnos.filter(function (turnoProvisorio) {
        return turnoProvisorio.especialidad.toLowerCase().includes(patron);
      });

      let filtroPorDia = listadoProvisorioTurnos.filter(function (turnoProvisorio) {
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
        
        return dia.includes(patron);
      });

      // filtro por nombre profesional
      let filtroProfesional = listadoProvisorioTurnos.filter((turnoProvisorio) => {
        for(let i = 0; i < this.listadoProfesionales.length; i++)
        {
          if(turnoProvisorio.idProfesional == this.listadoProfesionales[i].id)
          {
            return this.listadoProfesionales[i].nombre.toLowerCase().includes(patron) || this.listadoProfesionales[i].apellido.toLowerCase().includes(patron);
          }
        }
      });

      filtroPorEspecialidad = filtroPorEspecialidad.concat(filtroPorDia);
      filtroPorEspecialidad = filtroPorEspecialidad.concat(filtroProfesional);


      let arrayOrdenado = filtroPorEspecialidad.sort((a, b) => a.inicio.getTime() - b.inicio.getTime());

      this.listadoTurnosParaSolicitar = arrayOrdenado;
    }
    
  }
}
