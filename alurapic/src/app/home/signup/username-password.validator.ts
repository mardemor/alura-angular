import { FormGroup, ValidatorFn } from '@angular/forms';

export const usernamePasswordValidator: any = (formGroup: FormGroup) => {

    const username: string = formGroup.get('userName')?.value;
    const password: string = formGroup.get('password')?.value;
    
    if (username.length + password.length > 0) {
        return username == password ? { usernamePassword: true } : null;
    }
    else {
        return null;
    }
    
}

// VALIDAÇÃO CROSS-FIELD