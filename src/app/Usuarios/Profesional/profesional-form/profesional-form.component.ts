import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Profesional } from '../profesional';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../Shared/Library/custom-validators';

@Component({
  selector: 'app-profesional-form',
  templateUrl: './profesional-form.component.html',
  styleUrls: ['./profesional-form.component.css']
})
export class ProfesionalFormComponent implements OnInit {
  
  modo = "insert";  // insert - edit
  usuario: Profesional;
  password: string;
  profesionalForm: FormGroup;
  
  @Input() editarUsuario: Profesional;
  @Output() registrarUsuario: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.usuario = new Profesional();
    this.usuario.especialidades = [];
   }

  ngOnInit(): void {
    if(this.editarUsuario !== null && this.editarUsuario !== undefined)
    {
      this.modo = "edit";
      this.usuario = this.editarUsuario;
    }
    
    this.profesionalForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required],
      }, { validator: CustomValidators.valueMatcher("email", "confirmEmail")} ),
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
        confirmPassword: ['', Validators.required],
      }, { validator: CustomValidators.valueMatcher("password", "confirmPassword")} )
    });
  }

  Registrar_OnClick()
  {
    this.usuario.nombre = this.profesionalForm.get('nombre').value;
    this.usuario.apellido = this.profesionalForm.get('apellido').value;
    this.usuario.email = this.profesionalForm.get('emailGroup.email').value;
    this.usuario.perfil = "Profesional";
    this.usuario.especialidades = ["ae", "japish"];
    
    this.registrarUsuario.emit({
      obj: this.usuario,
      password:this.profesionalForm.get('passwordGroup.password').value
    });
  }
}