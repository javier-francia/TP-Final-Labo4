import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Jornada } from '../jornada';
import { JornadaService } from '../jornada.service';
import { BrowserStorageService } from '../../../../Access/browser-storage.service';
import { ProfesionalesService } from '../../../../Usuarios/Profesional/profesionales.service';

import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-jornada-form',
  templateUrl: './jornada-form.component.html',
  styleUrls: ['./jornada-form.component.css']
})
export class JornadaFormComponent implements OnInit {

  @Input() jornada: Jornada;
  @Output() agregarJornada: EventEmitter<Jornada> = new EventEmitter<Jornada>();
  @Output() modificarJornada: EventEmitter<Jornada> = new EventEmitter<Jornada>();

  accion: string;

  idProfesional: number;
  emailProfesional: string;

  especialidadesCargadas: Array<string> = [];
  duraciones = [30, 45, 60];
  diasDisponibles: Array<number>;
  horariosDisponiblesSabados: Array<string>;
  horariosDisponibles: Array<string>;

  jornadaForm: FormGroup;
  
  
  newId: number;

  constructor(private jornadaSvc: JornadaService,
              private browserStorageSvc: BrowserStorageService,
              private profesionalesSvc: ProfesionalesService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.horariosDisponibles = [
      "08:00","08:15","08:30","08:45","09:00","09:00","09:15","09:30","09:45","10:00","10:15","10:30","10:45","11:00","11:15","11:30","11:45","12:00","12:15","12:30","12:45","13:00","13:15",
      "13:30","13:45","14:00","14:15","14:30","14:45","15:00","15:15","15:30","15:45","16:00","16:15","16:30","16:45","17:00","17:15","17:30","17:45","18:00","18:15","18:30","18:45","19:00"
    ];

    this.horariosDisponiblesSabados = [
      "08:00","08:15","08:30","08:45","09:00","09:00","09:15","09:30","09:45","10:00","10:15","10:30","10:45","11:00","11:15","11:30","11:45","12:00","12:15","12:30","12:45","13:00","13:15","13:30","13:45"
    ];

    this.diasDisponibles = [1, 2, 3, 4, 5, 6];
    this.idProfesional = this.browserStorageSvc.GetId();
    
    let profesionalesObservable = this.profesionalesSvc.Get().subscribe((profesionalesSnapshot: any) => {
      for(let i = 0; i < profesionalesSnapshot.length; i++)
      {
        let unProfesional = profesionalesSnapshot[i];
        if(unProfesional.payload.doc.id != this.idProfesional)
        {
          continue;
        }

        this.especialidadesCargadas = unProfesional.payload.doc.data().especialidades;
        break;
      }
      profesionalesObservable.unsubscribe();
    });

    let jornadaTrabajoObservable = this.jornadaSvc.GetProfesionalJornada().subscribe((profesionalJornadaSnapshot: any) => {
      for(let i = 0; i < profesionalJornadaSnapshot.length; i++)
      {
        let unProfesionalJornada = profesionalJornadaSnapshot[i];
        if(unProfesionalJornada.payload.doc.data().id_profesional != this.idProfesional)
        {
          continue;
        }

        for(let j = 0; j < unProfesionalJornada.payload.doc.data().jornadas.length; j++)
        {
          let objetoJornada = JSON.parse(unProfesionalJornada.payload.doc.data().jornadas[j]);
          console.log(objetoJornada.dia);
          this.diasDisponibles.splice(this.diasDisponibles.indexOf(+objetoJornada.dia), 1);
        }
        break;
      }
      jornadaTrabajoObservable.unsubscribe();
    });


    if(this.jornada == null)
    {
      this.accion = "agregar";
      this.jornadaSvc.GetProfesionalJornada().subscribe(jornadaSnapshot => {
        this.newId = jornadaSnapshot.length + 1;
      });


      this.jornadaForm = this.fb.group({
        dia: ['seleccionar', Validators.required],
        especialidad: ['seleccionar', Validators.required],
        duracion: ['seleccionar', Validators.required],
        horaInicio: ['seleccionar', Validators.required],
        horaFin: ['seleccionar', Validators.required]
      });
    }
    else
    {
      this.accion = "editar";

      let arrayHorario = this.jornada.horario.split('-');
      this.diasDisponibles.push(this.jornada.dia);
      this.diasDisponibles.sort((a, b) => a - b);
      
      this.jornadaForm = this.fb.group({
        dia: [this.jornada.dia, Validators.required],
        especialidad: [this.jornada.especialidad, Validators.required],
        duracion: [this.jornada.duracion, Validators.required],
        horaInicio: [arrayHorario[0], Validators.required],
        horaFin: [arrayHorario[1], Validators.required]
      });
    }
  }

  EnviarFormJornada()
  {
    let jornadaNueva = new Jornada();
    jornadaNueva.dia = +this.jornadaForm.get("dia").value;
    jornadaNueva.duracion = +this.jornadaForm.get("duracion").value;
    jornadaNueva.especialidad = this.jornadaForm.get("especialidad").value;
    jornadaNueva.horario = this.jornadaForm.get("horaInicio").value + "-" + this.jornadaForm.get("horaFin").value;

    if(this.accion == "agregar")
    {
      this.agregarJornada.emit(jornadaNueva);
    }
    else if(this.accion == "editar")
    {
      this.modificarJornada.emit(jornadaNueva);
    }
  }

  placebo(){}
}