import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {trigger, state, style, animate, transition} from '@angular/animations';


@Component({
  selector: 'app-mi-captcha',
  templateUrl: './mi-captcha.component.html',
  styleUrls: ['./mi-captcha.component.css'],
  animations: [
    trigger('rotatedState', [
      state('0', style({ transform: 'rotate(0)' })),
      state('1', style({ transform: 'rotate(60deg)' })),
      state('2', style({ transform: 'rotate(120deg)' })),
      state('3', style({ transform: 'rotate(180deg)' })),
      state('4', style({ transform: 'rotate(-120deg)' })),
      state('5', style({ transform: 'rotate(-60deg)' })),
      transition('* <=> *', animate('200ms ease-out'))
    ])
  ]
})
export class MiCaptchaComponent implements OnInit {

  // 0 al 5
  stateNumber: number;
  state: string;
  picUrl: string;
  enFuncionamiento = true;

  @Output() validarCaptcha: EventEmitter<void> = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
    this.reset();
  }

  reset()
  {
    this.enFuncionamiento = true;
    let randomRotation = (Math.floor(Math.random() * Date.now()) % 5) + 1;
    this.stateNumber = randomRotation;
    this.state = randomRotation.toString();

    let randomPicture = Math.floor(Math.random() * Date.now()) % 4;
    this.picUrl = `../../../assets/img/miCaptcha/${randomPicture}.png`;
  }


  responder()
  {
    let boton = document.getElementById("btnValidar");
    if(this.stateNumber == 0)
    {
      boton.classList.value = "btn btn-success";
      boton.innerHTML = "<i class='fas fa-check'></i>";
      document.getElementById("btnIzq").setAttribute("disabled", "");
      document.getElementById("btnDer").setAttribute("disabled", "");
      boton.setAttribute("disabled", "");
      this.validarCaptcha.emit();
    }
    else
    {
      boton.classList.value = "btn btn-danger";
      boton.innerHTML = "<i class='fas fa-redo'></i>";
      this.enFuncionamiento = false;
    }
  }


  rotar(direccion: string)
  {
    if(direccion == "Left")
    {
      if(this.stateNumber == 0)
      {
        this.stateNumber = 5;
      }
      else
      {
        this.stateNumber--;
      }
    }
    else if(direccion == "Right")
    {
      if(this.stateNumber == 5)
      {
        this.stateNumber = 0;
      }
      else
      {
        this.stateNumber++;
      }
    }
    this.state = this.stateNumber.toString();
  }

}
