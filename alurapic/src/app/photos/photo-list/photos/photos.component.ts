import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { Photo } from '../../photo';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html'
})
export class PhotosComponent implements OnChanges {

  @Input() photos: Photo[] = [];
  rows: any[] = [];

  /**
   * A CADA MUDANÇA NA LISTA DE FOTOS REORGANIZA-A, AGRUPANDO 
   * AS FOTOS DE 3 EM 3.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.photos) {
      this.rows = this.groupColumns(this.photos);
    }
  }

  /**
   * RECEBE UMA LISTA DE FOTOS AGRUPANDO AS FOTOS EM LINHAS,
   * CADA UMA CONTENDO 3 FOTOS.
   */
  private groupColumns(photos: Photo[]): any[] {
    const newRows: any[] = [];
    for (let i = 0; i < photos.length; i+=3) {
      newRows.push(photos.slice(i, i + 3))
    }
    return newRows;
  }

}
