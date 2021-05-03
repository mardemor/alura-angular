import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { Router } from '@angular/router';

import * as StackTrace from 'stacktrace-js';

import { UserService } from 'src/app/core/user/user.service';
import { ServerLogService } from './server-log.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler { 

    constructor(private injector: Injector){ }

    /**
     * MANIPULADOR DE ERROS CUSTOMIZADO
     */
    handleError(error: any): void {

        // INJEÇÃO DOS SERVIÇOS
        const router = this.injector.get(Router);
        const location = this.injector.get(LocationStrategy);
        const userService = this.injector.get(UserService);
        const serverLogService = this.injector.get(ServerLogService); 

        // OBTEM A URL ONDE OCORREU O ERRO
        const url = location instanceof PathLocationStrategy ? location.path() : ''; 
        
        // OBTEM O NOME DO USUARIO QUE GEROU O ERRO
        const userName: string | undefined = userService.getUserName(); 

        // OBTEM A MENSAGEM DO ERRO
        const message = error.message ? error.message : error.toString();

        // DIRECIONA PARA A PAGINA DE ERRO (SOMENTE AMBIENTE DE PRODUÇÃO)
        if (environment.production) router.navigate(['/error']);

        // CUSTOMIZA A MENSAGEM DE ERRO NO CONSOLE E GRAVA O LOG DO ERRO NO SERVIDOR
        StackTrace.fromError(error)
        .then(
            stackFrames => {
                const stackAsString = stackFrames.map(
                    sf => sf.toString()
                )
                .join('\n');
                console.log('=================MESASAGE==================');
                console.log(message);
                console.log('==================STACK====================');           
                console.log(stackAsString);
                console.log('================END STACK==================');
                serverLogService.log({message, url, userName, stack: stackAsString})
                .subscribe(
                    () => console.log('Error logged on server successfully'),
                    (error) => {
                        console.log(error);
                        console.log('Fail to log error on server');                    
                    }
                )
            }
        );
    }
}