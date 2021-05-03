import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy { 

    @Output() onTyping = new EventEmitter<string>();
    @Input() value: string = '';
    observable: Subject<string> = new Subject<string>();

    /**
     * SE INSCREVE NO OBSERVABLE E USA UM EVENT EMMITER PARA ENVIAR 
     * AO TEMPLATE PHOTO LIST, A CADA 300 MS, OS CARACTERES DIGITADOS 
     * PELO USUARIO.
     */
    ngOnInit(): void {
        this.observable
        .pipe(debounceTime(300))
        .subscribe(valor => this.onTyping.emit(valor));
    }

    /**
     * CANCELA A INSCRIÇÃO NO OBSERVABLE
     */
    ngOnDestroy(): void {
        this.observable.unsubscribe();
    }
    
    /**
     * EVENTO DISPARADO AO KEYUP DO TECLADO. FAZ COM QUE O OBSERVABLE 
     * EMITA O TEXTO DIGITADO PELO USUARIO.
     */
    filtrar(elemento: EventTarget | null) {
        this.observable.next((elemento as HTMLInputElement).value);
    }
    
}