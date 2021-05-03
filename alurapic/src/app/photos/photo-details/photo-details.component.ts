import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { UserService } from 'src/app/core/user/user.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { Photo } from '../photo';
import { PhotoService } from '../photos.service';

@Component({
    templateUrl: './photo-details.component.html',
})
export class PhotoDetailsComponent implements OnInit { 

    photo$!: Observable<Photo>;
    photoId!: number;

    constructor(
        private route: ActivatedRoute,
        private photoService: PhotoService,
        private router: Router,
        private alertService: AlertService, 
        private userService: UserService
    ) { }

    /**
     * CARREGA O ID DA FOTO ENVIADO NA URL. BUSCA E CARREGA O OBSERVABLE
     * DA FOTO QUE POSSUI AQUELE ID. EM CASO DE ERRO AO BUSCAR A FOTO, 
     * DIRECIONA O FLUXO PARA A VIEW NOT-FOUND.  
     */
    ngOnInit(): void {
        this.photoId = this.route.snapshot.params['photoId'];
        this.photo$ = this.photoService.findById(this.photoId);
        this.photo$.subscribe(
            () => {},
            error => {
                console.log(error);
                this.router.navigate(['/not-found']);
            }
        )
    }

    /**
     * SOLICITA A REMOÇÃO DA FOTO EM EXIBIÇÃO. SE ATENDIDO, DIRECIONA O
     * FLUXO PARA A TIMELINE DO USUARIO. EM CASO DE ERRO, EXIBE MENSAGEM
     * AO USUARIO.
     */
    remove(): void {
        this.photoService.removePhoto(this.photoId)
        .subscribe(
            () => {
                this.alertService.success('Photo removed successfully', true);
                this.router.navigate(['/user', this.userService.getUserName()], { replaceUrl: true });
            },
            error => {
                console.log(error);
                this.alertService.danger('Could not delete the photo !', true);
            }
        );
    }

    /**
     * RECEBE UM ID DE FOTO E SOLICITA A ADIÇÃO DE UM LIKE À FOTO QUE 
     * POSSUI O ID. SE ATENDIDO, BUSCA E CARREGA A FOTO ATUALIZADA.
     */
    like(photo: Photo): void {
        this.photoService
        .like(photo.id)
        .subscribe(
            liked => {
                if(liked) {
                    this.photo$ = this.photoService.findById(photo.id);
                }
            }
        )        
    }
}
