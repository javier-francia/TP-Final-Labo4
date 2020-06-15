import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Turno } from '../turno';

@Component({
  selector: 'app-turno-listado',
  templateUrl: './turno-listado.component.html',
  styleUrls: ['./turno-listado.component.css']
})
export class TurnoListadoComponent implements OnInit {

  @Input() listadoTurnos: Array<Turno> = null;
  @Output() verDetalleTurno: EventEmitter<Turno> = new EventEmitter<Turno>();
  constructor() { }

  ngOnInit(): void {
  }

  onDetalle(unTurno: Turno)
  {
    this.verDetalleTurno.emit(unTurno);
  }

}
