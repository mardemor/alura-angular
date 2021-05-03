import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoadingService } from './loading.service';

@Injectable({ providedIn: 'root' })
export class LoadingInterceptor implements HttpInterceptor {

    constructor(private loadingService: LoadingService) { }
    
    /**
     * INTERCEPTADOR DE EVENTOS HTTP. CASO O EVENTO SEJA UMA RESPOSTA, 
     * A BARRA DE CARREGAMENTO SERA INTERROMPIDA. PARA QUALQUER OUTRO 
     * EVENTO, A BARRA SERA INICIADA. 
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next
        .handle(req)
        .pipe(
            tap(
                event => {
                    if (event instanceof HttpResponse) {
                        this.loadingService.stop();
                        
                    }
                    else {
                        this.loadingService.start();
                    }
                }
            )
        );
    }
    
}