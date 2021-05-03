import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { UserService } from '../user/user.service';

@Injectable({providedIn: 'root'})
export class LoginGuard implements CanActivate {

    constructor(
        private userService: UserService,
        private router: Router
    ) { }


    /**
     * RESTRINGE O ACESSO A PAGINA DE LOGIN POR USUARIOS LOGADOS. O FLUXO É 
     * REDIRECIONADO PARA A PAGINA DE TIMELINE.
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.userService.isLogged()) {
            this.router.navigate(['user', this.userService.getUserName()]);
            return false;
        }
        return true;        
    }
}