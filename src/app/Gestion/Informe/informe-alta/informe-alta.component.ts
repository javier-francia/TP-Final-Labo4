import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { EncuestaDatosPaciente } from '../encuesta-datos-paciente';
import { Turno } from '../../Turno/turno';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DatoPersonalizado } from '../dato-personalizado';


@Component({
  selector: 'app-informe-alta',
  templateUrl: './informe-alta.component.html',
  styleUrls: ['./informe-alta.component.css']
})
export class InformeAltaComponent implements OnInit, OnChanges {

  @Input() turnoActual: Turno;
  @Output() salida: EventEmitter<Turno> = new EventEmitter<Turno>();

  informePacienteForm: FormGroup;

  get datosPersonalizadosArray(): FormArray {
    return <FormArray> this.informePacienteForm.get("datosPersonalizados");
  } 

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.informePacienteForm = this.fb.group({
      edad: [null, [Validators.required, Validators.min(1), Validators.max(122)]],
      altura: [null, [Validators.required, Validators.min(0.30), Validators.max(2.46)]],
      peso: [null, [Validators.required, Validators.min(2), Validators.max(635)]],
      presionGroup: this.fb.group({
        presionAlta: [null, [Validators.required, Validators.min(115), Validators.max(165)]],
        presionBaja: [null, [Validators.required, Validators.min(60), Validators.max(115)]],
      }),
      datosPersonalizados: this.fb.array([]),
      resenia: [null, [Validators.required, Validators.minLength(30), Validators.maxLength(300)]],
    });
  }

  ngOnChanges(): void{
    document.getElementById("btnAddDatosEspecializados").hidden = false;
    this.informePacienteForm = this.fb.group({
      edad: [null, [Validators.required, Validators.min(1), Validators.max(122)]],
      altura: [null, [Validators.required, Validators.min(0.30), Validators.max(2.46)]],
      peso: [null, [Validators.required, Validators.min(2), Validators.max(635)]],
      presionGroup: this.fb.group({
        presionAlta: [null, [Validators.required, Validators.min(115), Validators.max(165)]],
        presionBaja: [null, [Validators.required, Validators.min(60), Validators.max(115)]],
      }),
      datosPersonalizados: this.fb.array([]),
      resenia: [null, [Validators.required, Validators.minLength(30), Validators.maxLength(300)]],
    });
  }

  addDatosPersonalizadosControl(): void
  {
    this.datosPersonalizadosArray.push(this.buildDatosPersonalizables());
    if(this.datosPersonalizadosArray.controls.length == 3)
    {
      document.getElementById("btnAddDatosEspecializados").hidden = true;
    }
  }

  Atender_OnClick()
  {
    this.turnoActual.resenia = this.informePacienteForm.get("resenia").value;
    this.turnoActual.datosPaciente = new EncuestaDatosPaciente();
    this.turnoActual.datosPaciente.altura = +this.informePacienteForm.get("altura").value;
    this.turnoActual.datosPaciente.peso = +this.informePacienteForm.get("peso").value;
    this.turnoActual.datosPaciente.edad = +this.informePacienteForm.get("edad").value;
    this.turnoActual.datosPaciente.presionArterial = this.informePacienteForm.get("presionGroup.presionAlta").value + "/" + this.informePacienteForm.get("presionGroup.presionBaja").value;
    this.turnoActual.datosPaciente.datosPersonalizados = [];
    this.turnoActual.estado = "Finalizado";

    for(let i = 0; i < this.datosPersonalizadosArray.controls.length; i++)
    {
      let esteDato = this.datosPersonalizadosArray.controls[i];
      let datoPersonalizado = new DatoPersonalizado();
      datoPersonalizado.clave = esteDato.value.clave;
      datoPersonalizado.valor = esteDato.value.valor;
      this.turnoActual.datosPaciente.datosPersonalizados.push(datoPersonalizado);
    }

    this.salida.emit(this.turnoActual);
  }

  buildDatosPersonalizables(): FormGroup {
    return this.fb.group({
      clave: ['', Validators.required],
      valor: ['', Validators.required]
    });
  }

  
  placebo(){}
}
