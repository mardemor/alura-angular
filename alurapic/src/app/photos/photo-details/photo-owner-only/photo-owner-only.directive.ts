import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";
import { Photo } from "../../photo";
import { Input } from "@angular/core";
import { UserService } from 'src/app/core/user/user.service';

@Directive({
    selector :'[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit {

    @Input() ownedPhoto: Photo | undefined;

    constructor(
        private element: ElementRef<any>,
        private renderer: Renderer2,
        private userService: UserService
    ) { }

    /**
     * CONDICIONA A EXIBICAO DE UM DETERMINADO ELEMENTO DO TEMPLATE APENAS
     * AO USUARIO DONO DA FOTO. 
     */
    ngOnInit(): void {
        this.userService
        .getUser()
        .subscribe(user => {
            if (!user || user.id != this.ownedPhoto?.userId) {
                this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
            }
        });
    }
}