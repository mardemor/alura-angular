import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { LoadingState } from './loading-state';

@Injectable({providedIn: 'root'})
export class LoadingService {

    loadingSubject = new Subject<LoadingState>();

    /**
     * RETORNA O OBSERVABLE CONTENDO UM LOADING STATE DO TIPO STOPPED  
     */
    getSubject(): Observable<LoadingState> {
        return this.loadingSubject
        .asObservable()
        .pipe(startWith(LoadingState.STOPPED));
    }

    /**
     * EMITE O OBSERVABLE CONTENDO O LOADING STATE DO TIPO LOADING
     */
    start(): void {
        return this.loadingSubject.next(LoadingState.LOADING)
    }

    /**
     * EMITE O OBSERVABLE CONTENDO O LOADING STATE DO TIPO STOPPED
     */
    stop(): void {
        return this.loadingSubject.next(LoadingState.STOPPED)
    }

}