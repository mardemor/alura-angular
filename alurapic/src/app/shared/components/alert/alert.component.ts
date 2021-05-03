import { Component, Input, OnInit } from "@angular/core";

import { Alert, AlertType } from './alert';
import { AlertService } from './alert.service';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {

    @Input() timeout: number = 3000;
    alerts: Alert[] = [];

    constructor(private alertService: AlertService) { }

    /**
     * OBTEM O OBSERVABLE DO ALERTA E SE INSCREVE PARA ESCUTA-LO. CASO
     * HAJA UM ALERTA NO OBSERVABLE, INCLUI ELE NA LISTA DE ALERTAS E 
     * SOLICITA SUA REMOÇÃO APOS 3000 MS. CASO O OBSERVABLE ESTEJA 
     * VAZIO, RESETA A LISTA DE ALERTAS.  
     */
    ngOnInit(): void {
        this.alertService
        .getAlert()
        ?.subscribe(alert => {
            if (!alert) {
                this.alerts = [];
                return;
            }
            this.alerts.push(alert);
            setTimeout(() => this.removeAlert(alert), this.timeout);
        })
    }

    /**
     * REMOVE DA LISTA O ALERTA PASSADO NO PARAMETRO.
     */
    private removeAlert(alertToRemove: Alert): void {
        this.alerts = this.alerts.filter(alert => alert != alertToRemove);
    }

    /**
     * RECEBE UM ALERTA COMO PARAMETRO E RETORNA UMA STRING CONTENDO
     * UMA CLASSE CSS PARA ESTILIZAR O ALERTA DE ACORDO COM O SEU 
     * TIPO. 
     */
    getAlertClass(alert: Alert): string {
        if (!alert) {
            return '';
        }
        switch (alert.alertType) {
            case AlertType.SUCCESS:
                return 'alert alert-success'
            case AlertType.WARNING:
                return 'alert alert-warning'
            case AlertType.DANGER:
                return 'alert alert-danger'
            case AlertType.INFO:
                return 'alert alert-info'
        }
    }
}