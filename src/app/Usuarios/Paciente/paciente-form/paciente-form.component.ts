import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Paciente } from '../paciente';
import { Upload } from '../../../Shared/upload';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../Shared/Library/custom-validators';

@Component({
  selector: 'app-paciente-form',
  templateUrl: './paciente-form.component.html',
  styleUrls: ['./paciente-form.component.css']
})
export class PacienteFormComponent implements OnInit {
  modo = "insert";  // insert - edit
  usuario: Paciente;
  pacienteForm: FormGroup;

  validExtensions = [
    "jpg",
    "jpeg",
    "png"
  ];

  img1: Upload;
  img2: Upload;
  
  @Input() editarUsuario: Paciente;
  @Output() registrarUsuario: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.usuario = new Paciente();
   }

  ngOnInit(): void {
    if(this.editarUsuario !== null && this.editarUsuario !== undefined)
    {
      this.modo = "edit";
      this.usuario = this.editarUsuario;
    }

    this.pacienteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required],
      }, { validator: CustomValidators.valueMatcher("email", "confirmEmail")} ),
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
        confirmPassword: ['', Validators.required],
      }, { validator: CustomValidators.valueMatcher("password", "confirmPassword")} ),
      img1: [null, Validators.required],
      img2: [null, Validators.required]
    });



  }

  Registrar_OnClick()
  {
    this.usuario.nombre = this.pacienteForm.get('nombre').value;
    this.usuario.apellido = this.pacienteForm.get('apellido').value;
    this.usuario.email = this.pacienteForm.get('emailGroup.email').value;
    this.usuario.perfil = "Paciente";


    this.registrarUsuario.emit({
      obj: this.usuario,
      password:this.pacienteForm.get('passwordGroup.password').value,
      img1: this.img1,
      img2: this.img2
    });
  }

  onChange(event)
  {
    let extension = this.ValidarExtension(event.target.files.item(0).name);
    if(extension !== null)
    {
      if(event.target.id === "img1")
      {
        this.img1 = new Upload(event.target.files.item(0));
        this.img1.extension = extension;
      }
      else if(event.target.id === "img2")
      {
        this.img2 = new Upload(event.target.files.item(0));
        this.img2.extension = extension;
      }
    }
    else
    {
      if(event.target.id === "img1")
      {
        this.pacienteForm.patchValue({
          img1: null
        });
      }
      else if(event.target.id === "img2")
      {
        this.pacienteForm.patchValue({
          img2: null
        });
      }
    }
  }

  ValidarExtension(fileName: string) : string
  {
      let separateFileName = fileName.split(".");
      let extension = separateFileName[separateFileName.length - 1]

      if(this.validExtensions.includes(extension)) return extension;
      else return null;
  }
}