import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/core/auth/auth.service';
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';

@Component({
    templateUrl: './signin.component.html'
})
export class SigninComponent implements OnInit { 

    fromUrl: string = '';
    loginForm!: FormGroup;
    @ViewChild('userNameInput') userNameInput!: ElementRef<HTMLInputElement>;

    constructor(
        private builder: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private platformService: PlatformDetectorService,
        private activatedRoute: ActivatedRoute,
        private alertService: AlertService
    ) {}

    /**
     * OBTEM NA URL DE ORIGEM INFORMAÇÃO DE TENTATIVA DE 
     * ACESSO RESTRITO ANTES DO LOGIN. REGISTRA OS CAMPOS 
     * DO FORMULARIO E SEUS VALIDADORES. DA O FOCO PARA O CAMPO 
     * USERNAME. 
     */
    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(
            params => {
                this.fromUrl = params['fromUrl'];
            }
        );
        this.loginForm = this.builder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required]
        });
        if (this.platformService.isPlatformBrowser()) 
            this.userNameInput?.nativeElement.focus();
    }

    /**
     * OBTEM USERNAME E PASSWORD DO USUARIO E SOLICITA AUTENTICAÇÃO.
     * RETORNA POR PADRÃO A VIEW DE TIMELINE. SE HOUVE SOLICITAÇÃO DE 
     * ACESSO RESTRITO ANTES DO LOGIN, ATENDE A SOLICITAÇÃO. SE O 
     * USUARIO NÃO FOR AUTENTICADO RETORNA MENSAGEM. 
     */
    login(): void {
        const userName = this.loginForm.get('userName')?.value;
        const password = this.loginForm.get('password')?.value;
        this.authService
        .authenticate(userName, password)
        .subscribe(
            () => {
                if (this.fromUrl) {
                    this.router.navigateByUrl(this.fromUrl);
                }
                else {
                    this.router.navigate(['user', userName]);
                }
            },
            error => {
                this.alertService.danger('Invalid data.', true);
                this.loginForm.reset();
                if (this.platformService.isPlatformBrowser()) 
                    this.userNameInput.nativeElement.focus();
            }
        );

    }
}