import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { UserService } from '../user/user.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private router: Router
    ) { }


    /**
     * RESTRINGE O ACESSO A UMA ROTA POR USUARIOS NÃO LOGADOS
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
        if (!this.userService.isLogged()) {
            this.router.navigate(
                [''],
                {queryParams: { fromUrl: state.url }}
            );
            return false;
        }
        return true;        
    }
}