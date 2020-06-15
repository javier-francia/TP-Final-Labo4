import { Component, OnInit, Input } from '@angular/core';
import { Turno } from '../turno';

@Component({
  selector: 'app-turno-detalle',
  templateUrl: './turno-detalle.component.html',
  styleUrls: ['./turno-detalle.component.css']
})
export class TurnoDetalleComponent implements OnInit {

  @Input() turnoMostrarDetalle: Turno;
  @Input() sujetoDetalle: string;
  constructor() { }

  ngOnInit(): void {
  }

}
