import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo';
import { PhotoService } from '../photos.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html'
})
export class PhotoListComponent implements OnInit {

  photos: Photo[] = [];
  filter: string = '';
  hasMore: boolean = true;
  currentPage: number = 1;
  userName: string = '';

  constructor (
    private activatedRoute: ActivatedRoute, 
    private photoService: PhotoService
  ) { }

  /**
   * CARREGA O USERNAME E A LISTA DE FOTOS QUE FOI ADICIONADA AO  
   * ACTIVATED ROUTE PELO PHOTO LIST RESOLVER
   */
  ngOnInit(): void {
    this.activatedRoute.params
    .subscribe(
      params => {
        this.userName = params['userName'];
        this.photos = this.activatedRoute.snapshot.data['photos'];                
      }
    );
  }

  /**
   * CARREGA MAIS FOTOS, CASO HAJAM OUTRAS, ALEM DAS 12 PRIMEIRAS QUE 
   * FORAM PAGINADAS. 
   */
  load() {
    this.photoService
    .listFromUserPaginated(this.userName, ++this.currentPage)
    .subscribe(
      photos => {
        this.filter = '';
        this.photos = this.photos.concat(photos);
        if (!photos.length) this.hasMore = false;
      }
    );
  }

}
