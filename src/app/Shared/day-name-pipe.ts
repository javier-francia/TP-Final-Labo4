import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dayName'
})
export class DayNamePipe implements PipeTransform {

  transform(value: string): string {
    let output = "";  
    switch(value)
    {
        case "1":
            output = "Lunes";
            break;
        case "2":
            output = "Martes";
            break;
        case "3":
            output = "Miércoles";
            break;
        case "4":
            output = "Jueves";
            break;
        case "5":
            output = "Viernes";
            break;
        case "6":
            output = "Sábado";
            break;
    }
    return output;
  }
}
