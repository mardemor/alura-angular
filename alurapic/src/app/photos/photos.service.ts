import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Photo } from './photo';
import { PhotoComment } from './photo-details/photo-comments/photo-comment';
import { environment } from '../../environments/environment'

const API = environment.ApiUrl;

@Injectable({providedIn: 'root'})
export class PhotoService {

    constructor(private http: HttpClient) { }

    /**
     * RETORNA UM OBSERVABLE CONTENDO TODAS AS FOTOS DE UM DETERMINADO USUARIO
     */
    listFromUser(userName: string): Observable<Photo[]> {
        return this.http.get<Photo[]>(`${API}/${userName}/photos`);
    }

    /**
     * RETORNA UM OBSERVABLE CONTENDO UMA PAGINA COM 12 FOTOS DE UM DETERMINADO USUARIO
     */
    listFromUserPaginated(userName: string, page: number): Observable<Photo[]> {        
        const params = new HttpParams().append('page', page.toString());        
        return this.http.get<Photo[]>(`${API}/${userName}/photos`, { params });
    }

    /**
     * RECEBE OS DADOS DE UMA FOTO E OS ENVIA PARA SEREM GRAVADOS NA API. 
     * RETORNA UM OBSERVABLE CONTENDO A RESPOSTA DA API. 
     */
    upload(
        description: string, 
        allowComments: boolean, 
        file: File | null | undefined
    ): Observable<HttpEvent<Object>> {

        if (!file) throw new Error('File does not exist.');
        
        const formData = new FormData();
        formData.append('description', description);
        formData.append('allowComments', allowComments + '');
        formData.append('imageFile', file);
        return this.http.post(
            API + '/photos/upload', 
            formData, 
            {
                observe: 'events', 
                reportProgress: true
            }
        );        
    }

    /**
     * RECEBE UM ID DE FOTO E RETORNA UM OBSERVABLE CONTENDO A FOTO 
     * REFERENTE AO ID. 
     */
    findById(photoId: number): Observable<Photo> {
        return this.http.get<Photo>(API + '/photos/' + photoId);
    }

    /**
     * RECEBE UM ID DE FOTO E RETORNA UM OBSERVABLE CONTENDO A LISTA DE 
     * COMENTARIOS REFERENTES AQUELA FOTO.
     */
    getComments(photoId: number): Observable<PhotoComment[]> {
        return this.http.get<PhotoComment[]>(API + '/photos/' + photoId + '/comments');
    }

    /**
     * RECEBE UM ID DE FOTO E UM COMENTARIO. ENVIA O COMENTARIO PARA SER 
     * GRAVADO NA API, VINCULADO A FOTO DAQUELE ID. RETORNA UM OBSERVABLE 
     * CONTENDO A RESPOSTA DA API.
     */
    addComment(photoId: number, commentText: string): Observable<Object> {
        return this.http.post(
            API + '/photos/' + photoId + '/comments', 
            {commentText: commentText}
        );
    }

    /**
     * RECEBE UM ID DE FOTO E REMOVE A FOTO QUE POSSUI ESTE ID. RETORNA 
     * UM OBSERVABLE CONTENDO A RESPOSTA DA API.
     */
    removePhoto(photoId: number): Observable<object> {
        return this.http.delete(API + '/photos/' + photoId);
    }

    /**
     * RECEBE UM ID DE FOTO E ADICIONA UM LIKE À FOTO QUE POSSUI ESTE ID. 
     * RETORNA UM OBSERVABLE CONTENDO UM BOOLEAN CONFORME REGRA DA API. 
     * A API SO PERMITE UM LIKE POR USUARIO. SE O USUARIO ENVIA SEU 
     * PRIMEIRO LIKE, A INCLUSÃO É REALIZADA E O RETORNO É "TRUE". SE O 
     * USUARIO TENTA ENVIAR MAIS UM LIKE, A API RETORNA UM ERRO 304 E 
     * O RETORNO É "FALSE". QUALQUER OUTRO ERRO RETORNADO PELA API SERÁ 
     * REPASSADO AO SOLICITANTE.  
     */
    like(photoId: number): Observable<boolean> {
        return this.http
        .post(
            API + '/photos/' + photoId + '/like', 
            {}, 
            {observe: 'response'}
        )
        .pipe(
            map(res => true)
        )
        .pipe(
            catchError(
                err => {
                    return err.status == '304' ? of(false) : throwError(err);
                }
            )
        )
    }
}