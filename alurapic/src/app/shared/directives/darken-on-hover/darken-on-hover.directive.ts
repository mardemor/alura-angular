import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appDarkenOnHover]'
})
export class DarkenOnHoverDirective { 

    @Input() brightness: string = '70%';

    constructor(private element: ElementRef, private render: Renderer2) { }

    /**
     * NA OCORRENCIA DO EVENTO DE MOUSE OVER, DEFINE UM ESTILO DE FILTRO COM 
     * VALOR PREDEFINIDO, PARA QUALQUER ELEMENTO DO TEMPLATE QUE POSSUIR A 
     * DIRETIVA appDarkenOnHover. 
     */
    @HostListener('mouseover')
    darkenOn(): void {
        this.render.setStyle(this.element.nativeElement, 'filter', `brightness(${this.brightness})`);
    }

    /**
     * NA OCORRENCIA DO EVENTO DE MOUSE LEAVE, DEFINE UM ESTILO DE FILTRO COM 
     * VALOR 100%, PARA QUALQUER ELEMENTO DO TEMPLATE QUE POSSUIR A DIRETIVA
     * appDarkenOnHover. 
     */
    @HostListener('mouseleave')
    darkenOff(): void {
        this.render.setStyle(this.element.nativeElement, 'filter', 'brightness(100%)');
    }
}