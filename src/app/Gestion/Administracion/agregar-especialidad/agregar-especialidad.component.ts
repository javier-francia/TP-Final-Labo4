import { Component, OnInit } from '@angular/core';
import { EspecialidadService } from '../../../Shared/Servicios/especialidad.service';
import { fadeInFastAnimation } from '../../../animationsRoot';

@Component({
  selector: 'app-agregar-especialidad',
  templateUrl: './agregar-especialidad.component.html',
  styleUrls: ['./agregar-especialidad.component.css'],
  animations: [ fadeInFastAnimation ],
  host: { '[@fadeInFastAnimation]': '' }
})
export class AgregarEspecialidadComponent implements OnInit {

  readonly pageSize = 7;
  page: number = 1;

  listadoEspecialidades: Array<string> = [];
  newId: number;

  especialidadParaCargar = "";

  constructor(private especialidadSvc: EspecialidadService) { }

  ngOnInit(): void {
    this.ObtenerEspecialidades();
  }

  ObtenerEspecialidades()
  {
    this.listadoEspecialidades = [];
    let especialidadObservable = this.especialidadSvc.Get().subscribe((especialidadSnapshot: any) => {
      this.newId = especialidadSnapshot.length + 1;
      especialidadSnapshot.forEach(element => {
        this.listadoEspecialidades.push(element.payload.doc.data().nombre);
      });
      especialidadObservable.unsubscribe();
    })
  }

  OnCargarEspecialidad()
  {
    this.especialidadParaCargar = "";
    document.getElementById("btnModalCargar").click();
  }

  CargarEspecialidad()
  {
    this.especialidadSvc.Insert(this.newId, this.especialidadParaCargar).then(() => {
      this.listadoEspecialidades.push(this.especialidadParaCargar);
      this.newId++;
      document.getElementById("btnDescartaModal").click();
    }).catch();
  }
}
