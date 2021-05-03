import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { NewUser } from './new-user';
import { SignupService } from './signup.service';
import { UserNotTakenValidatorService } from './user-not-taken-validator.service';
import { usernamePasswordValidator } from './username-password.validator';

@Component({
    templateUrl: './signup.component.html',
    providers: [UserNotTakenValidatorService]
})
export class SignupComponent implements OnInit {

    signupForm!: FormGroup;
    @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;

    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatorService,
        private signupService: SignupService,
        private router: Router,
        private platformDetectorService: PlatformDetectorService,
        private alertService: AlertService
    ) { }

    /**
     * REGISTRA OS CAMPOS DO FORMULARIO E SEUS RESPECTIVOS VALIDADORES. DA
     * O FOCO PARA O CAMPO EMAILINPUT
     */
    ngOnInit(): void {
        this.signupForm = this.formBuilder.group (
            {
                email: [
                    '',
                    [
                        Validators.required,
                        Validators.email
                    ]
                ],
                fullName: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(2),
                        Validators.maxLength(40)
                    ]
                ],
                userName: [
                    '',
                    [
                        Validators.required,
                        lowerCaseValidator,
                        Validators.minLength(2),
                        Validators.maxLength(30)
                    ],
                    this.userNotTakenValidatorService.checkUserNameTaken()
                ],
                password: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(8),
                        Validators.maxLength(14)
                    ]
                ]
            },
            {
                // VALIDAÇÃO CROSS-FIELD
                validator: usernamePasswordValidator
            }
        );

        if (this.platformDetectorService.isPlatformBrowser())
            this.emailInput?.nativeElement.focus();
    }

    /**
     * ENVIA OS DADOS DO USUARIO PARA CADASTRO CASO NÃO HAJAM INCONSNSTENCIAS 
     * NOS CAMPOS DO FORMULARIO
     */
    signup(): void {        
        if (!this.signupForm.invalid && !this.signupForm.pending) {
            const newUser = this.signupForm.getRawValue() as NewUser;
            this.signupService
            .signup(newUser)
            .subscribe(
                () => {
                    this.router.navigate(['']);
                    this.alertService.success('User created successfully.', true);
                },
                error => {
                    console.log(error.message);
                    this.alertService.danger('User could not be created. Try later...', true);
                }
            );
        }
    }
}