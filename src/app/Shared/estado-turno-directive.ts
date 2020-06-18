import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appEstadoTurno]'
})
export class EstadoTurnoDirective {

    constructor(private el: ElementRef) { }

    @Input() set appEstadoTurno (estadoTurno: string){
        let color = "";

        switch (estadoTurno) 
        {
            case "Rechazado":
                color = "#ff8a71";
                break;
            case "Cancelado":
                color = "#ff8a71";
                break;
            case "Pendiente":
                color = "#fcff51";
                break;
            case "Confirmado":
                color = "#affffc";
                break;
            case "Finalizado":
                color = "#9cff9c";
                break;
        }

        this.el.nativeElement.parentElement.style.backgroundColor = color;
    }
}