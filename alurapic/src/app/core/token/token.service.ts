import { Injectable } from '@angular/core';

const KEY = 'authToken';

@Injectable({ providedIn: 'root' })
export class TokenService {

    /**
     * RETORNA TRUE SE HOVER TOKEN DE AUTENTICAÇÃO REGISTRADO NO 
     * STORAGE DO NAVEGADOR. CASO CONTRARIO RETORNA FALSE.
     */
    hasToken(): boolean {
        return !!this.getToken();        
    }

    /**
     * RECEBE UM TOKEN DE AUTENTICAÇÃO E O REGISTRA NO STORAGE 
     * DO NAVEGADOR.
     */
    setToken(token: string): void {
        window.localStorage.setItem(KEY, token);
    }

    /**
     * RETORNA UM TOKEN DE AUTENTICAÇÃO, REGISTRADO NO STORAGE DO 
     * NAVEGADOR, CASO HAJA. CASO NÃO HAJA, RETORNA NULL.
     */
    getToken(): string | null {
        return window.localStorage.getItem(KEY);
    }

    /**
     * REMOVE UM TOKEN DE AUTENTICAÇÃO DO STORAGE DO NAVEGADOR.
     */
    removeToken(): void {
        window.localStorage.removeItem(KEY);
    }
}