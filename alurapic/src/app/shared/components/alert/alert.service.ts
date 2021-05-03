import { Injectable, OnInit } from "@angular/core";
import { NavigationStart, Router } from '@angular/router';

import { Observable, Subject } from "rxjs";

import { AlertType, Alert } from "./alert";

@Injectable({ providedIn: 'root'})
export class AlertService implements OnInit {

    alertSubject: Subject<Alert | null> = new Subject<Alert | null>();
    keepAfterRouteChange: boolean = false;

    constructor(private router: Router) { }

    /**
     * SE INSCREVE PARA OUVIR EVENTOS DE MUDANÇA DE ROTA. NA OCORRENCIA 
     * DO EVENTO, CASO O ATRIBUTO DE INSTANCIA KEEPAFTERROUTECHANGE FOR 
     * FALSE, SERA EMITIDO UM OBSERVABLE VAZIO PARA QUE A LISTA DE ALERTAS 
     * DO COMPONENTE SEJA ZERADA. CASO SEJA TRUE, O ALERTA PERMANECE NA 
     * TELA PELO TEMPO PREDEFINIDO PELO COMPONENTE, MESMO APOS A MUDANCA 
     * DE ROTA.
     */
    ngOnInit(): void {
        this.router.events
        .subscribe(
            event => {
                if (event instanceof NavigationStart) {
                    if (this.keepAfterRouteChange) {
                        this.keepAfterRouteChange = false;
                    }
                    else {
                        this.clear();
                    }
                }
            }
        );
    }

    /**
     * RECEBE COMO PARAMETROS UM TIPO DE ALERTA, UA MENSAGEM E UM SINALIZADOR
     * QUE INDICA SE O ALERTA DEVE PERMANECER NA TELA, MESMO APOS A MUDANÇA 
     * DA ROTA. EMITE O OBSERVABLE COM UM NOVO ALERTA. 
     */
    private alert(alertType: AlertType, message: string, keepAfterRouteChange: boolean): void {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.alertSubject?.next(new Alert(alertType, message));
    }

    /**
     * EMITE O OBSERVABLE SEM NENHUM ALERTA
     */
    private clear(): void {
        this.alertSubject.next(null);
    }

    /**
     * RETORNA O OBSERVABLE PARA SUBSCRIÇÃO 
     */
    getAlert(): Observable<Alert | null> {
        return this.alertSubject?.asObservable();
    }

    /**
     * SOLICITA A EMISSÃO DE UM NOVO ALERTA DO TIPO SUCCESS 
     */
    success(message: string, keepAfterRouteChange: boolean = false): void {
        this.alert(AlertType.SUCCESS, message, keepAfterRouteChange);
    }

    /**
     * SOLICITA A EMISSÃO DE UM NOVO ALERTA DO TIPO WARNING
     */
    warning(message: string, keepAfterRouteChange: boolean = false): void {
        this.alert(AlertType.WARNING, message, keepAfterRouteChange);
    }

    /**
     * SOLICITA A EMISSÃO DE UM NOVO ALERTA DO TIPO DANGER 
     */
    danger(message: string, keepAfterRouteChange: boolean = false): void {
        this.alert(AlertType.DANGER, message, keepAfterRouteChange);
    }

    /**
     * SOLICITA A EMISSÃO DE UM NOVO ALERTA DO TIPO INFO 
     */
    info(message: string, keepAfterRouteChange: boolean = false): void {
        this.alert(AlertType.INFO, message, keepAfterRouteChange);
    }

}