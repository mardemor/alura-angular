import { Component, OnInit } from "@angular/core";

import { Observable } from 'rxjs';

import { User } from '../user/user';
import { UserService } from "../user/user.service";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

    user$: Observable<User | null> | undefined;

    constructor(private userService: UserService) { }

    /**
     * SOLICITA O USUARIO LOGADO E O DISPONIBILIZA PARA
     * O TEMPLATE NA FORMA DE OBSERVABLE 
     */
    ngOnInit(): void {
     this.user$ = this.userService.getUser();     
    }
}