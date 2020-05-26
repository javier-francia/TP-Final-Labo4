import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Profesional } from '../profesional';

@Component({
  selector: 'app-profesional-form',
  templateUrl: './profesional-form.component.html',
  styleUrls: ['./profesional-form.component.css']
})
export class ProfesionalFormComponent implements OnInit {
  
  modo = "insert";  // insert - edit
  usuario: Profesional;
  password: string;
  
  @Input() editarUsuario: Profesional;
  @Output() registrarUsuario: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.usuario = new Profesional();
    this.usuario.especialidades = [];
   }

  ngOnInit(): void {
    if(this.editarUsuario !== null && this.editarUsuario !== undefined)
    {
      this.modo = "edit";
      this.usuario = this.editarUsuario;
    }
  }

  Registrar_OnClick()
  {
    this.registrarUsuario.emit({
      obj: this.usuario,
      password: this.password
    });
  }

}
