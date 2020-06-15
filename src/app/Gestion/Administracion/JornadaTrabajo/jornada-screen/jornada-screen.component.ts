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

  constructor(private jornadaSvc: JornadaService,
              private browserStorageSvc: BrowserStorageService) { }

  ngOnInit(): void {
    this.obtenerJornadaActual();    
  }
  
  obtenerJornadaActual()
  {
    let idProfesional = this.browserStorageSvc.GetId();
    let listadoProvisorio: Array<ProfesionalJornada> = [];

    let jornadasObservable = this.jornadaSvc.GetProfesionalJornada().subscribe((jornadaSnapshot: any) => {
      if(jornadaSnapshot.length > 0)
      {
        for(let i = 0; i < jornadaSnapshot.length; i++)
        {
          if(jornadaSnapshot[i].payload.doc.data().id_profesional != idProfesional) continue;

          let objeto = new ProfesionalJornada();
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
          listadoProvisorio.push(objeto);
        }
      }
      listadoProvisorio.reverse(); //cambiar por ordenar fecha descendiente
      if(listadoProvisorio.length > 0)
      {
        this.jornadasActuales = listadoProvisorio[0].jornadas;
      }
      else
      {
        this.jornadasActuales = null;
      }

      jornadasObservable.unsubscribe();
    });
  }

  onModificarJornada(unaJornada: Jornada)
  {
    // Modificacion
  }
}
