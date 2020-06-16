import { Component, OnInit } from '@angular/core';
import { JornadaService } from '../jornada.service';
import { BrowserStorageService } from '../../../../Access/browser-storage.service';
import { Jornada } from '../jornada';
import { ProfesionalJornada } from '../profesional-jornada';

@Component({
  selector: 'app-jornada-screen',
  templateUrl: './jornada-screen.component.html',
  styleUrls: ['./jornada-screen.component.css']
})
export class JornadaScreenComponent implements OnInit {

  jornadasActuales: Array<Jornada> = null;
  idJornadaTrabajo: number;
  jornadaSeleccionada: Jornada;

  accionJornada: string;

  constructor(private jornadaSvc: JornadaService,
              private browserStorageSvc: BrowserStorageService) { }

  ngOnInit(): void {
    this.jornadasActuales = []
    this.obtenerJornadaActual();    
  }
  
  obtenerJornadaActual()
  {
    let idProfesional = this.browserStorageSvc.GetId();

    let jornadasObservable = this.jornadaSvc.GetProfesionalJornada().subscribe((jornadaSnapshot: any) => {
      let jornadaTrabajadorCreated = false;
      this.idJornadaTrabajo = jornadaSnapshot.length + 1;

      for(let i = 0; i < jornadaSnapshot.length; i++)
      {
        if(jornadaSnapshot[i].payload.doc.data().id_profesional != idProfesional) continue;
        jornadaTrabajadorCreated = true;

        let objeto = new ProfesionalJornada();
        objeto.id = +jornadaSnapshot[i].payload.doc.id;
        this.idJornadaTrabajo = objeto.id;
        objeto.id_profesional = idProfesional;
        let arrayJornadasString: Array<string> = jornadaSnapshot[i].payload.doc.data().jornadas;
        for(let j = 0; j < arrayJornadasString.length; j++)
        {
          let jornada = new Jornada();
          let jotaSon = JSON.parse(arrayJornadasString[j]);
          jornada.dia = jotaSon.dia;
          jornada.especialidad = jotaSon.especialidad;
          jornada.horario = jotaSon.horario;
          jornada.duracion = jotaSon.duracion;
          objeto.jornadas.push(jornada);
        }
        this.jornadasActuales = objeto.jornadas;
      }

      if(!jornadaTrabajadorCreated)
      {
        let jornadasObservableConfirm = this.jornadaSvc.GetProfesionalJornada().subscribe((jornadaSnapshotConfirm: any) => {
          let jornadaTrabajadorCreatedConfirm = false;
          this.idJornadaTrabajo = jornadaSnapshotConfirm.length + 1;
    
          for(let i = 0; i < jornadaSnapshotConfirm.length; i++)
          {
            if(jornadaSnapshotConfirm[i].payload.doc.data().id_profesional != idProfesional) continue;
            jornadaTrabajadorCreatedConfirm = true;
          }
          
          this.jornadaSvc.Insert(this.idJornadaTrabajo, idProfesional);
          jornadasObservableConfirm.unsubscribe();
          jornadasObservable.unsubscribe();
        });
      }
    });
  }

  onModificarJornada(unaJornada: Jornada)
  {
    this.accionJornada = "Modificar jornada";
    document.getElementById("btnModalJornada").click();
    this.jornadaSeleccionada = unaJornada;
  }

  modificarJornada(unaJornada: Jornada)
  {
    document.getElementById("btnDescartaModal").click();
    for(let i = 0; i < this.jornadasActuales.length; i++)
    {
      let jornadaActual = this.jornadasActuales[i];
      if(jornadaActual.dia == unaJornada.dia)
      {
        this.jornadasActuales[i] = unaJornada;
        break;
      }
    }

    this.jornadaSvc.UpdateJornadas(this.jornadasActuales, this.idJornadaTrabajo).then().catch();
    this.accionJornada = "";
    this.jornadaSeleccionada = null;
  }

  onAgregarJornada()
  {
    this.accionJornada = "Agregar jornada";
    document.getElementById("btnModalJornada").click();
    this.jornadaSeleccionada = null;
  }

  agregarJornada(unaJornada: Jornada)
  {
    document.getElementById("btnDescartaModal").click();
    
    this.jornadasActuales.push(unaJornada);
    this.jornadasActuales.sort((a, b) => a.dia - b.dia);

    this.jornadaSvc.UpdateJornadas(this.jornadasActuales, this.idJornadaTrabajo).then().catch();
    this.accionJornada = "";
  }

  onEliminarJornada(unaJornada: Jornada)
  {
    this.accionJornada = "Eliminar jornada";
    document.getElementById("btnModalJornada").click();
    this.jornadaSeleccionada = unaJornada;
  }

  eliminarJornada()
  {
    for(let i = 0; i < this.jornadasActuales.length; i++)
    {
      let jornadaActual = this.jornadasActuales[i];
      if(jornadaActual.dia == this.jornadaSeleccionada.dia)
      {
        this.jornadasActuales.splice(i, 1);
        break;
      }
    }

    this.jornadaSvc.UpdateJornadas(this.jornadasActuales, this.idJornadaTrabajo).then().catch();
    this.accionJornada = "";
    this.jornadaSeleccionada = null;
    document.getElementById("btnDescartaModal").click();
  }
}
