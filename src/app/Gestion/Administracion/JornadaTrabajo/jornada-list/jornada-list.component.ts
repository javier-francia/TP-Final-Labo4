import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProfesionalJornada } from '../profesional-jornada';

@Component({
  selector: 'app-jornada-list',
  templateUrl: './jornada-list.component.html',
  styleUrls: ['./jornada-list.component.css']
})
export class JornadaListComponent implements OnInit {

  @Input() listadoMostrar: Array<ProfesionalJornada>;
  @Output() verDetalle: EventEmitter<ProfesionalJornada> = new EventEmitter<ProfesionalJornada>();

  constructor() { }

  ngOnInit(): void {
  }

  onVerDetalles(elemento: ProfesionalJornada)
  {
    this.verDetalle.emit(elemento);
  }

}
