import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Jornada } from '../jornada';

@Component({
  selector: 'app-jornada-list',
  templateUrl: './jornada-list.component.html',
  styleUrls: ['./jornada-list.component.css']
})
export class JornadaListComponent implements OnInit {

  @Input() listadoJornadas: Array<Jornada> = [];
  @Output() modificarJornada: EventEmitter<Jornada> = new EventEmitter<Jornada>();
  @Output() eliminarJornada: EventEmitter<Jornada> = new EventEmitter<Jornada>();

  constructor() { }

  ngOnInit(): void {
  }
  

  onModificar(elemento: Jornada)
  {
    this.modificarJornada.emit(elemento);
  }

  onEliminar(elemento: Jornada)
  {
    this.eliminarJornada.emit(elemento);
  }


  removeFromArray(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
  }
}
