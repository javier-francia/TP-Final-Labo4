import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Profesional } from '../profesional';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { CustomValidators } from '../../../Shared/Library/custom-validators';
import { EspecialidadService } from '../../../Shared/Servicios/especialidad.service';

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
  especialidadesCargadas: Array<string>;
  especialidadNewId: number;

  get especialidades(): FormArray {
    return <FormArray> this.profesionalForm.get("especialidades");
  } 

  
  @Input() editarUsuario: Profesional;
  @Output() registrarUsuario: EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
              private especialidadSvc: EspecialidadService) {
    this.usuario = new Profesional();
    this.usuario.especialidades = [];
    this.especialidadesCargadas = [];
   }

  ngOnInit(): void {
    if(this.editarUsuario !== null && this.editarUsuario !== undefined)
    {
      this.modo = "edit";
      this.usuario = this.editarUsuario;
    }
    else
    {
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
        }, { validator: CustomValidators.valueMatcher("password", "confirmPassword")} ),
        especialidades: this.fb.array([new FormControl(null)], CustomValidators.repeatedValues)
      });

      /*      Cargo dropdown de especialidades a elegir     */
      let getEspecialidad = this.especialidadSvc.Get().subscribe(snapshot => {
        this.especialidadNewId = snapshot.length + 1;
        snapshot.forEach((especialidadData: any) => {
          this.especialidadesCargadas.push(especialidadData.payload.doc.data().nombre);
        });
        getEspecialidad.unsubscribe;
      });
      
    }
    
    
  }

  Registrar_OnClick()
  {
    this.usuario.nombre = this.profesionalForm.get('nombre').value;
    this.usuario.apellido = this.profesionalForm.get('apellido').value;
    this.usuario.email = this.profesionalForm.get('emailGroup.email').value;
    this.usuario.perfil = "Profesional";

    this.especialidades.controls.forEach(element => {
      this.usuario.especialidades.push(element.value);
    });
    
    this.registrarUsuario.emit({
      obj: this.usuario,
      password:this.profesionalForm.get('passwordGroup.password').value
    });
  }

  onChangeEspecialidad(event: any)
  {
    //console.log(event.target.value);
    /*this.especialidadesRestantes = Array.from(this.especialidadesCargadas);

    this.especialidades.controls.forEach(element => {
      let index = this.especialidadesRestantes.indexOf(element.value);
      this.especialidadesRestantes.splice(index, 1);
      //console.log(element.value);
    });

    if(this.especialidades.controls.includes(event.target.value))
    {
      event.target.value = "seleccionar";
      this.especialidades.controls.forEach(element => {
        element.value = null;
      });
    }


    event.target.value = "ae";
    */
  }

  addEspecialidadControl(): void
  {
    this.especialidades.push(new FormControl());
    if(this.especialidades.controls.length == this.especialidadesCargadas.length)
    {
      document.getElementById("btnAddEspecialidad").hidden = true;
    }
  }

  placebo(): void
  {
  }
}