import { Component, OnInit } from "@angular/core";

import { LoadingService } from "./loading.service";

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

    loadingState: string = '';

    constructor(private loadingService: LoadingService) { }

    /**
     * OBTEM E SE INSCREVE PARA ESCUTAR O OBSERVABLE DE MUDANÇA DE 
     * LOADING STATE. NA OCORRENCIA DO EVENTO, CARREGA O ATRIBUTO 
     * LOADING STATE, QUE SERA UTILIZADO PELO TEMPLATE PARA ESTILIZAR 
     * A BARRA DE CARREGAMENTO.
     */
    ngOnInit(): void { 
        this.loadingService
        .getSubject()
        .subscribe(loadingState => this.loadingState = loadingState.valueOf());
    }
}