import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from "rxjs";
import { switchMap, tap } from "rxjs/operators";

import { PhotoService } from "../../photos.service";
import { PhotoComment } from './photo-comment';

@Component({
    selector: 'app-photo-comments',
    templateUrl: './photo-comments.component.html',
    styleUrls: ['./photo-comments.component.css']
})
export class PhotoCommentsComponent implements OnInit {

    @Input() photoId!: number;
    comments$: Observable<PhotoComment[]> | undefined;
    commentForm!: FormGroup;

    constructor(
        private photoService: PhotoService,
        private formBuilder: FormBuilder
    ) { }

    /**
     * CARREGA OS COMENTARIOS DA FOTO E REGISTRA OS CAMPOS DO FORMULARIO
     * E SEUS RESPECTIVOS VALIDADORES.
     */
    ngOnInit(): void {
        this.comments$ = this.photoService.getComments(this.photoId);
        this.commentForm = this.formBuilder.group({
            comment: ['', Validators.maxLength(300)]
        });
    }

    /**
     * OBTEM O COMENTARIO NO CAMPO DO FORMULARIO E O ADICIONA NA FOTO A 
     * QUAL PERTENCE O COMENTARIO. CARREGA A LISTA DE COMENTARIOS ATUALIZADA
     * E RESETA O FORMULARIO. 
     */
    save(): void {
        const comment = this.commentForm.get('comment')?.value as string;
        this.comments$ = this.photoService
        .addComment(this.photoId, comment)
        .pipe(
            switchMap(
                () => this.photoService.getComments(this.photoId)
            )
        )
        .pipe(
            tap(
                () => {
                    this.commentForm.reset();
                }
            )
        );       
    }
}