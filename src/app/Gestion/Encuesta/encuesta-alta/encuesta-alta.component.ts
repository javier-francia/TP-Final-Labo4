import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Turno } from '../../Turno/turno';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { EncuestaDatosProfesional } from '../encuesta-datos-profesional';


@Component({
  selector: 'app-encuesta-alta',
  templateUrl: './encuesta-alta.component.html',
  styleUrls: ['./encuesta-alta.component.css'],
  providers: [ NgbRatingConfig ]
})
export class EncuestaAltaComponent implements OnInit, OnChanges {

  @Input() turno: Turno;
  @Output() enviarEncuesta: EventEmitter<Turno> = new EventEmitter<Turno>();

  mensajesError = false;

  encuestaProfesionalForm: FormGroup;

  constructor(config: NgbRatingConfig,
              private fb: FormBuilder) {
    config.max = 5;
  }

  ngOnInit(): void {
    this.encuestaProfesionalForm = this.fb.group({
      atencion: [null, Validators.required],
      higiene: [null, Validators.required],
      amabilidad: [null, Validators.required],
      tiempoEspera: [null, Validators.required],
      comentarios: ['', Validators.maxLength(200)],
    });
  }

  ngOnChanges(): void {
    this.encuestaProfesionalForm = this.fb.group({
      atencion: [null, Validators.required],
      higiene: [null, Validators.required],
      amabilidad: [null, Validators.required],
      tiempoEspera: [null, Validators.required],
      comentarios: ['', Validators.maxLength(200)],
    });
  }


  Enviar_OnClick()
  {
    this.mensajesError = true;
    if(!this.encuestaProfesionalForm.valid)
    {
      return;
    }

    let datosEncuesta = new EncuestaDatosProfesional();
    datosEncuesta.amabilidad = +this.encuestaProfesionalForm.get("amabilidad").value;
    datosEncuesta.atencion = +this.encuestaProfesionalForm.get("atencion").value;
    datosEncuesta.higiene = +this.encuestaProfesionalForm.get("higiene").value;
    datosEncuesta.tiempoEspera = +this.encuestaProfesionalForm.get("tiempoEspera").value;
    document.getElementById("btnPrimeraConsulta").innerHTML == "Si" ? datosEncuesta.primeraConsulta = true : datosEncuesta.primeraConsulta = false;
    document.getElementById("btnRecomendaria").innerHTML == "Si" ? datosEncuesta.recomendaria = true : datosEncuesta.recomendaria = false;
    datosEncuesta.comentarios = this.encuestaProfesionalForm.get("comentarios").value;

    this.turno.datosProfesional = datosEncuesta;
    this.enviarEncuesta.emit(this.turno);
  }

  toggleSiNo(id: string)
  {
    let button = document.getElementById(id);
    if(button.innerHTML == "Si")
    {
      button.className = "btn btn-danger";
      button.innerHTML = "No";
    }
    else
    {
      button.className = "btn btn-primary";
      button.innerHTML = "Si";
    }
  }

  placebo(){}
}
