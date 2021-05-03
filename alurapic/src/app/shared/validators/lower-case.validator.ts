import { AbstractControl } from '@angular/forms';

/**
 * VALIDADOR CUSTOMIZADO QUE VERIFICA SE O TEXTO ESTA EM UPPER CASE. 
 */
export function lowerCaseValidator(control: AbstractControl) {

    if(control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)) {
        return { lowercase: true }
    }
    return null;
}