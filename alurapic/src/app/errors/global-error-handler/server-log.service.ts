import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ServerLog } from './server-log';
import { environment } from '../../../environments/environment'
import { Observable } from 'rxjs';

const API = environment.ServerLogUrl;

@Injectable({providedIn: 'root'})
export class ServerLogService {

    constructor(private http: HttpClient) { }

    /**
     * ENVIA LOG DO ERRO PARA O SERVIDOR DEDICADO E RETORNA O
     * STATUS DO ENVIO
     */
    log(serverLog: ServerLog): Observable<Object> {
        return this.http.post(API + '/infra/log', serverLog);
    }
}