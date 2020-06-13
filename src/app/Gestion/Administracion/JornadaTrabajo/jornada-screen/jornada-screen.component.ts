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

  listadoProfesionalJornada: Array<ProfesionalJornada> = null;

  constructor(private jornadaSvc: JornadaService,
              private browserStorageSvc: BrowserStorageService) { }

  ngOnInit(): void {
    let idProfesional = this.browserStorageSvc.GetId();

    let jornadasObservable = this.jornadaSvc.GetProfesionalJornada().subscribe((jornadaSnapshot: any) => {
      console.log(jornadaSnapshot);
      if(jornadaSnapshot.length > 0)
      {
        this.listadoProfesionalJornada = [];
        for(let i = 0; i < jornadaSnapshot.length; i++)
        {
          if(jornadaSnapshot[i].payload.doc.data().id_profesional != idProfesional) continue;

          if(i == 3) break;

          let objeto = new ProfesionalJornada();
          objeto.id_profesional = idProfesional;
          objeto.inicio = new Date(jornadaSnapshot[i].payload.doc.data().inicio.toDate());
          let arrayJornadasString: Array<string> = jornadaSnapshot[i].payload.doc.data().jornadas;
          for(let j = 0; j < arrayJornadasString.length; j++)
          {
            let jornada = new Jornada();
            let jotaSon = JSON.parse(arrayJornadasString[j]);
            jornada.dia = jotaSon.dia;
            jornada.especialidad = jotaSon.especialidad;
            jornada.horario = jotaSon.horario;
            objeto.jornadas.push(jornada);
          }
          this.listadoProfesionalJornada.push(objeto);
        }
      }
      this.listadoProfesionalJornada.reverse(); //cambiar por ordenar fecha descendiente
      if(this.listadoProfesionalJornada.length > 3) this.listadoProfesionalJornada = this.listadoProfesionalJornada.slice(0, 2);
      jornadasObservable.unsubscribe();
    });

  }

  onVerDetalle(elemento: ProfesionalJornada)
  {
    console.log("llego");
  }

}
