import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {

    static valueMatcher(controlName: string, compareControlName: string): ValidatorFn
    {
        return (c: AbstractControl): { [key: string]: boolean } | null =>
        {
            const control = c.get(controlName);
            const compareControl = c.get(compareControlName);

            if(control.pristine || compareControl.pristine)
            {
                return null;        // Si alguno de los dos controles no fue tocado
            }

            if(control.value === compareControl.value)
            {
                return null;
            }

            return { 'match': true };
        }
    }
}
