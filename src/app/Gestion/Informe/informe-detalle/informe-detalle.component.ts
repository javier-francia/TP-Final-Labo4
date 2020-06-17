import { Component, OnInit, Input } from '@angular/core';
import { Turno } from '../../Turno/turno';

@Component({
  selector: 'app-informe-detalle',
  templateUrl: './informe-detalle.component.html',
  styleUrls: ['./informe-detalle.component.css']
})
export class InformeDetalleComponent implements OnInit {

  @Input() turno: Turno;
  constructor() { }

  ngOnInit(): void {
  }

}
