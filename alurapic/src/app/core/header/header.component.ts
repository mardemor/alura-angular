import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { User } from '../user/user';
import { UserService } from '../user/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    user$: Observable<User | null>;

    constructor(
        private userService: UserService,
        private router: Router
    ) {
        this.user$ = userService.getUser();
    }

    /**
     * SOLICITA O LOGOUT DO USUARIO E DIRECIONA PARA A 
     * VIEW DE LOGIN
     */
    logout() {
        this.userService.logout();
        this.router.navigate(['']);
    }
}