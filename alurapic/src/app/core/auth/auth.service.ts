import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';

import { UserService } from '../user/user.service';
import { environment } from '../../../environments/environment'

const API = environment.ApiUrl;

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(
        private http: HttpClient,
        private userService: UserService
    ) {}

    /**
     * ENVIA PARA A API O USERNAME E O PASSWORD DO USUARIO PARA SEREM VALIDADOS. 
     * A API RETORNA UM TOKEN QUE SERÁ REGISTRADO NO STORAGE DO NAVEGADOR  
     */
    authenticate(userName: string, password: string) {

        return this.http
            .post(API + '/user/login', { userName, password }, { observe: 'response' })
            .pipe(
                tap(
                    res => {                                                
                        const authToken: string | null = res.headers.get('x-access-token');
                        if (authToken) {
                            this.userService.setToken(authToken);
                            console.log(`User ${userName} authenticated with token ${authToken}`);
                        }
                    }
                )
            )
    }
}