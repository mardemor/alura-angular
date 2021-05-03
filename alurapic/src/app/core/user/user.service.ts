import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

import { TokenService } from '../token/token.service';
import { User } from './user';

@Injectable({ providedIn: 'root' })
export class UserService {

    private subject = new BehaviorSubject<User | null>(null);
    private user: User | null | undefined;

    /**
     * VERIFICA SE EXISTE UM TOKEN DE AUTENTICAÇÃO GRAVADO NO STORAGE 
     * DO NAVEGADOR. CASO EXISTA, DECODIFICA O TOKEN OBTENDO SEU USUARIO, 
     * E REGISTRA O OBSERVABLE DO USUARIO
     */
    constructor(private tokenService: TokenService) {
        if (this.tokenService.hasToken()) {
            const token = this.tokenService.getToken();
            this.user = this.decodeToken(token);
            this.subject.next(this.user);
        }       
    }

    /**
     * RECEBE UM TOKEN DE AUTENTICAÇÃO E O REGISTRA NO STORAGE DO NAVEGADOR. 
     * DECODIFICA O TOKEN OBTENDO SEU USUARIO, E REGISTRA O OBSERVABLE DO 
     * USUARIO
     */
    setToken(token: string): void {
        this.tokenService.setToken(token);
        this.user = this.decodeToken(token);
        this.subject.next(this.user);
    }

    /**
     * RETORNA O OBSERVABLE DE USUARIO
     */
    getUser(): Observable<User | null> {
        return this.subject.asObservable();        
    }

    /**
     * REMOVE DO STORAGE O TOKEN DE AUTENTICAÇÃO E ANULA O REGISTRO 
     * DO OBSERVABLE DE USUARIO 
     */
    logout(): void {
        this.tokenService.removeToken();
        this.subject.next(null);
        console.log(`User ${this.user?.name} logged off`);        
    }

    /**
     * RETORNA TRUE SE HOUVER TOKEN GRAVADO NO STORAGE DO NAVEGADOR 
     * OU FALSE SE NÃO HOUVER.
     */
    isLogged(): boolean {
        return this.tokenService.hasToken();
    }

    /**
     * RETORNA O NOME DO USUARIO PROPRIETÁRIO DO TOKEN DE AUTENTICAÇÃO
     */
    getUserName(): string | undefined {
        return this.user?.name;
    }

    /**
     * RECEBE UM TOKEN DO TIPO STRING E RETORNA UM OBJETO QUE REPRESENTA
     * O USUARIO PROPRIETARIO DO TOKEN
     */
    private decodeToken(token: string | null): User | null {  
        return token ? jwt_decode(token) as User : null;
    }
}