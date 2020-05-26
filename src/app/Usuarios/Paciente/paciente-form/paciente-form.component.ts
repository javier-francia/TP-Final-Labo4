import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Paciente } from '../paciente';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css']
})
export class PacienteFormComponent implements OnInit {
  modo = "insert";  // insert - edit
  usuario: Paciente;
  password: string;
  
  @Input() editarUsuario: Paciente;
  @Output() registrarUsuario: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.usuario = new Paciente();
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
