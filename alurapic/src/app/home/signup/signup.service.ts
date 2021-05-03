import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { NewUser } from './new-user';
import { environment } from '../../../environments/environment'

const API = environment.ApiUrl;

@Injectable()
export class SignupService {

    constructor(private http: HttpClient) { }

    /**
     * VERIFICA SE O NOME DE USUARIO PASSADO PARA CADASTRO JÁ EXISTE.
     * CASO EXISTA RETORNA O OBJETO {userNameTaken: boolean} PARA SER 
     * UTILIZADO COMO VALIDADOR.
     */
    checkUserNameTaken(userName: string): Observable<Object> {        
        return this.http.get(API + '/user/exists/' + userName);
    }

    /**
     * RECEBE UM OBJETO NEWUSER E O ENVIA PARA CADASTRO NA API 
     */
    signup(newUser: NewUser): Observable<Object> {
        return this.http.post(API + '/user/signup', newUser);
    }
}