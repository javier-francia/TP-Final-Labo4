import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fechaSacado'
})
export class FechaSacadoPipe implements PipeTransform {

  transform(value: Date): string {
    let output = "";
    let ahora = new Date(Date.now());

    let diferenciaEnSegundos = +((ahora.getTime() - value.getTime()) / 1000).toFixed();

    if(diferenciaEnSegundos < 60)
    {
        output = "hace < 1 minuto";
    }
    else
    {
        let diferenciaEnMinutos = +(diferenciaEnSegundos / 60).toFixed();

        if(diferenciaEnMinutos < 60)
        {
            output = `hace ${diferenciaEnMinutos} minuto`;
            if(diferenciaEnMinutos != 1) output += "s";
        }
        else
        {
            let diferenciaEnHoras = +(diferenciaEnMinutos / 60).toFixed();

            if(diferenciaEnHoras < 24)
            {
                output = `hace ${diferenciaEnHoras} hora`;
                if(diferenciaEnHoras != 1) output += "s";
            }
            else
            {
                let diferenciaEnDias = +(diferenciaEnHoras / 24).toFixed();
                
                output = `hace ${diferenciaEnDias} día`;
                if(diferenciaEnDias != 1) output += "s";
            }
        }
    }

    return output;
  }
}