import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{ 

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) { }


  ngOnInit(): void {
    this.router.events
    .pipe(
      filter(
        event => {
          // RETORNA APENAS OS EVENTOS DO TIPO NavigationEnd
          return event instanceof NavigationEnd;
        }
      )
    )
    .pipe(
      map(
        () => { 
          // RETORNA AS ROTAS DOS EVENTOS ACIMA
          return this.activatedRoute;
        }
      )
    )
    .pipe(
      map(
        route => {
          // RETORNA TODAS AS ROTAS ACIMA, ACRESCENTANDO SUAS FILHAS
          while(route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }
      )
    )
    .pipe(
      switchMap(
        route => {
          // RETORNA OS TITULOS DAS ROTAS ACIMA
          return route.data;
        }
      )
    )
    .subscribe(
      event => {
        // UTILIZA O SERVICO TITLE DO ANGULAR PARA SETAR OS TITULOS 
        // ACIMA AOS SEUS RESPECTIVOS TEMPLATES
        this.titleService.setTitle(event.title);
      }
    )
  }
}
