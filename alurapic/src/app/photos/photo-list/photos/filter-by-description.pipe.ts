import { Pipe, PipeTransform } from '@angular/core';

import { Photo } from '../../photo';

@Pipe({ name: 'filterByDescription'})
export class FilterByDescription implements PipeTransform {

    /**
     * RECEBE UMA LISTA DE FOTOS E UM TEXTO PARA CONSULTA. RETORNA UMA 
     * LISTA FILTRADA COM AS FOTOS CUJA DESCRIÇÃO COINCIDA COM O TEXTO 
     * DA CONSULTA OU PARTE DELE. SE O TEXTO PARA CONSULTA FOR VAZIO, 
     * RETORNA A LISTA COM TODAS AS FOTOS.   
     */
    transform(photos: Photo[], descriptionQuery: string): Photo[] {
        descriptionQuery = descriptionQuery.trim().toLowerCase();
        if (descriptionQuery) {
            return photos.filter(
                photo => photo.description.toLowerCase().includes(descriptionQuery)
            );
        }
        else {
            return photos;
        }
    }
}