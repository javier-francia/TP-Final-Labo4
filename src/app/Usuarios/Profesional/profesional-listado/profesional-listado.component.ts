import { Component, OnInit } from '@angular/core';
import { Profesional } from '../profesional';
import { ProfesionalesService } from '../profesionales.service';
import { UsuariosService } from '../../Usuario/usuarios.service';

@Component({
  selector: 'app-profesional-listado',
  templateUrl: './profesional-listado.component.html',
  styleUrls: ['./profesional-listado.component.css']
})
export class ProfesionalListadoComponent implements OnInit {


  readonly pageSize = 7;
  page: number = 1;

  listadoProfesionales: Array<Profesional> = [];
  listadoNoHabilitados: Array<number> = [];
  listadoFinal: Array<Profesional> = [];

  profesionalActual: Profesional;

  constructor(private profesionalSvc: ProfesionalesService,
              private usuariosSvc: UsuariosService) { }

  ngOnInit(): void {
    this.ObtenerListados();
  }

  ObtenerListados()
  {
    this.listadoProfesionales = [];
    this.listadoNoHabilitados = [];
    this.listadoFinal = [];
    let profesionalObservable = this.profesionalSvc.Get().subscribe((profesionalSnapshot: any) => {
      for(let i = 0; i < profesionalSnapshot.length; i++)
      {
        let profesionalActual = profesionalSnapshot[i];

        let unProfesional = new Profesional();
        unProfesional.id = +profesionalActual.payload.doc.id;
        unProfesional.nombre = profesionalActual.payload.doc.data().nombre;
        unProfesional.apellido = profesionalActual.payload.doc.data().apellido;
        unProfesional.email = profesionalActual.payload.doc.data().email;
        this.listadoProfesionales.push(unProfesional);
      }

      let usuarioObservable = this.usuariosSvc.Get().subscribe((usuarioSnapshot: any) => {
        for(let i = 0; i < usuarioSnapshot.length; i++)
        {
          let habilitado: boolean = usuarioSnapshot[i].payload.doc.data().habilitado;
          if(!habilitado)
          {
            this.listadoNoHabilitados.push(+usuarioSnapshot[i].payload.doc.id);
          }
        }
        
        this.SetearNoHabilitados();
        usuarioObservable.unsubscribe();
        profesionalObservable.unsubscribe();

      });
    });
  }

  SetearNoHabilitados()
  {
    for(let i = 0; i < this.listadoProfesionales.length; i++)
    {
      for(let j = 0; j < this.listadoNoHabilitados.length; j++)
      {
        if(this.listadoProfesionales[i].id == this.listadoNoHabilitados[j])
        {
          this.listadoFinal.push(this.listadoProfesionales[i]);
        }
      }
    }
  }

  OnHabilitar(unProfesional: Profesional)
  {
    this.profesionalActual = unProfesional;
    document.getElementById("btnModalHabilitar").click();
  }

  HabilitarCuenta()
  {
    this.usuariosSvc.UpdateHabilitado(this.profesionalActual.id, true).then(() => {
      this.profesionalActual = undefined;
      this.ObtenerListados();
    }).catch();
  }
}
