import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { Photo } from '../photo';
import { PhotoService } from '../photos.service';

@Injectable({providedIn: 'root'})
export class PhotoListResolver implements Resolve<Observable<Photo[]>> {

    constructor(private photoService: PhotoService) { }

    /**
     * OBTEM O USER NAME DA URL E UTILIZA-O PARA RETORNAR UMA LISTA CONTENDO 
     * UMA PAGINA DE FOTOS. ESTA LISTA DEVE SER ADICIONADA A ROTA.
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Photo[]> {
        const userName = route.params.userName;
        return this.photoService.listFromUserPaginated(userName, 1);
    }

}