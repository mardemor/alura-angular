import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpEvent, HttpEventType} from '@angular/common/http';

import { finalize } from 'rxjs/operators';

import { UserService } from 'src/app/core/user/user.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { PhotoService } from '../photos.service';


@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
})
export class PhotoFormComponent implements OnInit {

  photoForm!: FormGroup;
  file: File | null | undefined;
  preview: string | null | undefined;
  percentDone: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService
  ) { }

  /**
   * REGISTRA OS CAMPOS DO FORMULARIO E SEUS RESPECTIVOS VALIDADORES. 
   * INICIALIZA O CAMPO ALLOWCOMMENTS COM O VALOR TRUE.
   */
  ngOnInit(): void {
    this.photoForm = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    });
  }

  /**
   * METODO INVOCADO QUANDO O USUARIO ALTERA O ARQUIVO DE UPLOAD. CARREGA 
   * A ATUALIZAÇÃO DA IMAGEM DE PREVIEW PARA O UPLOAD.
   */
  fileChanged(inputFile: HTMLInputElement): void {
    this.file = inputFile.files?.item(0);
    const reader = new FileReader();
    reader.onload = event => {
      const resultado: string | null | undefined | ArrayBuffer = event.target?.result;
      this.preview = resultado?.toString();
    }
    reader.readAsDataURL(this.file!);    
  }

  /**
   * OBTEM OS DADOS DA FOTO E SOLICITA A GRAVAÇÃO NA API. SE ATENDIDO 
   * EXIBE O PROGRESSO DO UPLOAD E AO FINAL, DIRECIONA O FLUXO PARA A 
   * TIMELINE DO USUARIO. EM CASO DE ERRO EXIBE MENSAGEM.
   */
  upload(): void {
    const description = this.photoForm.get('description')?.value;
    const allowComments = this.photoForm.get('allowComments')?.value;
    this.photoService
    .upload(description, allowComments, this.file)
    .pipe(
      finalize(
        () => {
          this.router.navigate(['/user', this.userService.getUserName()]);
        }
      )
    )
    .subscribe(
      (event: HttpEvent<any>) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total!);
        }
        else if (event.type == HttpEventType.Response) {
          this.alertService.success('Upload completed', true)
        }        
      },
      error => {
        console.log(error);
        this.alertService.danger('Upload failed !', true);
      }      
    );     
  }

}
