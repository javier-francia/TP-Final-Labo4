import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Admin } from '../admin';
import { CustomValidators } from '../../../Shared/Library/custom-validators';


@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css']
})
export class AdminFormComponent implements OnInit {
  
  modo = "insert";  // insert - edit
  usuario: Admin;
  password: string;
  adminForm: FormGroup;

  
  @Input() editarUsuario: Admin;
  @Output() registrarUsuario: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.usuario = new Admin();
   }

  ngOnInit(): void {
    if(this.editarUsuario !== null && this.editarUsuario !== undefined)
    {
      this.modo = "edit";
      this.usuario = this.editarUsuario;
    }
    else
    {
      this.adminForm = this.fb.group({
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
    
    
  }

  Registrar_OnClick()
  {
    this.usuario.nombre = this.adminForm.get('nombre').value;
    this.usuario.apellido = this.adminForm.get('apellido').value;
    this.usuario.email = this.adminForm.get('emailGroup.email').value;
    this.usuario.perfil = "Admin";
    this.usuario.superUser = false;

    this.registrarUsuario.emit({
      obj: this.usuario,
      password:this.adminForm.get('passwordGroup.password').value
    });
  }


  placebo(): void
  {
  }
}
