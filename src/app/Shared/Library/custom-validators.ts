import { AbstractControl, ValidatorFn, FormArray } from '@angular/forms';

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

    static repeatedValues(c: FormArray): { [key: string]: boolean } | null 
    {
        let output = false;
        if(c.pristine)
        {
            return null;
        }

        let elementsFound = [];
        c.controls.forEach(element => {
            if(element.value !== null)
            {
                if(elementsFound.includes(element.value))
                {
                    output = true;
                }
                elementsFound.push(element.value);
            }
        });

        if(output)
        {
            return {"repeated": true};
        }
        else
        {
            return null;
        }
    }
}
