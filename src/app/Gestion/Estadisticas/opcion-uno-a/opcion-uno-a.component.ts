import { Component, OnInit } from '@angular/core';
import { fadeInFastAnimation } from '../../../animationsRoot';

@Component({
  selector: 'app-opcion-uno-a',
  templateUrl: './opcion-uno-a.component.html',
  styleUrls: ['./opcion-uno-a.component.css'],
  animations: [ fadeInFastAnimation ],
  host: { '[@fadeInFastAnimation]': '' }
})
export class OpcionUnoAComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
