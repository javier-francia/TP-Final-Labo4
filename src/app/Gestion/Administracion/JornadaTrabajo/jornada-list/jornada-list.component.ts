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
  @Output() agregarJornada: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    
  }
  

  onModificar(elemento: Jornada)
  {
    this.modificarJornada.emit(elemento);
  }

  onAgregar(idDia: number)
  {
    this.agregarJornada.emit(idDia);
  }


  removeFromArray(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
  }
}
