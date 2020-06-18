import { Component, OnInit, Input } from '@angular/core';
import { Turno } from '../../Turno/turno';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-encuesta-detalle',
  templateUrl: './encuesta-detalle.component.html',
  styleUrls: ['./encuesta-detalle.component.css'],
  providers: [ NgbRatingConfig ]
})
export class EncuestaDetalleComponent implements OnInit {

  @Input() turno: Turno;


  constructor(config: NgbRatingConfig) { 
    config.max = 5;
  }

  ngOnInit(): void {

  }

}