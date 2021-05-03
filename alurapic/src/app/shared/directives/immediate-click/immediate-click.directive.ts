import { Directive, ElementRef, OnInit } from "@angular/core";
import { PlatformDetectorService } from 'src/app/core/platform-detector/platform-detector.service';

@Directive({
    selector: '[immediateClick]'
})
export class ImmediateClickDirective implements OnInit {

    constructor(
        private element: ElementRef<any>,
        private platformDetector: PlatformDetectorService,
    ) { }
    
    /**
     * QUALQUER ELEMENTO DO TEMPLATE QUE POSSUIR A DIRETIVA immediateClick,
     * TERA SEU EVENTO DE CLICK ACIONADO AUTOMATICAMENTE AO SER CARREGADO. 
     */
    ngOnInit(): void {
        if (this.platformDetector.isPlatformBrowser())
            this.element.nativeElement.click();
    }
}