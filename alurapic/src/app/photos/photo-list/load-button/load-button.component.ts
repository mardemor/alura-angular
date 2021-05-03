import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-load-button',
  templateUrl: './load-button.component.html'
})
export class LoadButtonComponent {

  @Input() hasMore: boolean = true;

}
