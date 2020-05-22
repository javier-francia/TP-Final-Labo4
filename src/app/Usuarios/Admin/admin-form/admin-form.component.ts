import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Admin } from '../admin';


@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {
  modo = "insert";  // insert - edit
  usuario: Admin;
  password: string;
  
  @Input() editarUsuario: Admin;
  @Output() registrarUsuario: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.usuario = new Admin();
    this.usuario.superUser = false;
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
