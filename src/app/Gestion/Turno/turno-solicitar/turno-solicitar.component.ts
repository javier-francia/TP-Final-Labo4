import { Component, OnInit } from '@angular/core';
import { TurnosServiceService } from '../turnos-service.service';
import { Turno } from '../turno';
import { JornadaService } from '../../Administracion/JornadaTrabajo/jornada.service';
import { ProfesionalJornada } from '../../Administracion/JornadaTrabajo/profesional-jornada';
import { Jornada } from '../../Administracion/JornadaTrabajo/jornada';
import { GestorDeTurnosService } from '../gestor-de-turnos.service';
import { Profesional } from '../../../Usuarios/Profesional/profesional';
import { ProfesionalesService } from '../../../Usuarios/Profesional/profesionales.service';
import { BrowserStorageService } from '../../../Access/browser-storage.service';
import { Router } from '@angular/router';
import { PacientesService } from '../../../Usuarios/Paciente/pacientes.service';

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
  listadoTurnosParaSolicitar: Array<Turno> = [];
  listadoProfesionales: Array<Profesional>;
  turnoElegido: Turno = null;
  newId: number;
  nombrePaciente: string;

  patronBusqueda = "";
  
  constructor(private turnosSvc: TurnosServiceService,
              private jornadaSvc: JornadaService,
              private gestorDeTurnosSvc: GestorDeTurnosService,
              private profesionalSvc: ProfesionalesService,
              private browserStorageSvc: BrowserStorageService,
              private router: Router,
              private pacientesSvc: PacientesService) { }

  ngOnInit(): void {
    this.listadoProfesionales = [];
    this.listadoTurnosVivos = [];
    this.listadoJornadasTrabajo = [];
    this.obtenerTurnosVivos();
    this.obtenerJornadasTrabajo();
    this.obtenerProfesionales();
    this.turnosSvc.Get().subscribe((turnoSnapshot: any) => {
      this.newId = turnoSnapshot.length + 1;
    });
    let pacienteId = this.browserStorageSvc.GetId();
    this.obtenerNombrePaciente(pacienteId);
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
        
        let profesionalesObservable = this.profesionalSvc.Get().subscribe((profesionalSnapshot: any) => {
          for(let j = 0; j < profesionalSnapshot.length; j++)
          {
            if(+profesionalSnapshot[j].payload.doc.id == profJornada.id_profesional)
            {
              profJornada.nombreCompleto = profesionalSnapshot[j].payload.doc.data().nombre + " " + profesionalSnapshot[j].payload.doc.data().apellido;
              break;
            }
          }
          profesionalesObservable.unsubscribe();
        });

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
      jornadasObservable.unsubscribe();
    });
  }

  obtenerProfesionales()
  {
    let profesionalesObservable = this.profesionalSvc.Get().subscribe((profesionalSnapshot) => {
      profesionalSnapshot.forEach((element: any) => {
        let profesional = new Profesional();
        profesional.id = +element.payload.doc.id;
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

  onVerDetalle(unTurno: Turno)
  {
    this.turnoElegido = unTurno;
    document.getElementById("btnModalDetalle").click();
  }

  pedirTurno()
  {
    let idPaciente = this.browserStorageSvc.GetId();
    this.turnoElegido.id = this.newId;
    this.turnoElegido.idPaciente = idPaciente;
    this.turnoElegido.estado = "Pendiente";
    this.turnoElegido.nombreCompletoPaciente = this.nombrePaciente;
    this.turnosSvc.Insert(this.turnoElegido).then(() =>{
      this.router.navigate(['Home']);
    });
  }

  obtenerNombrePaciente(idPaciente: number)
  {
    this.pacientesSvc.Get().subscribe((pacienteSnapshot: any) => {
      for(let i = 0; i < pacienteSnapshot.length; i++)
      {
        if(pacienteSnapshot[i].payload.doc.id == idPaciente)
        {
          this.nombrePaciente = pacienteSnapshot[i].payload.doc.data().apellido + ", " + pacienteSnapshot[i].payload.doc.data().nombre;
          break;
        }
      }
    });
  }
}
