import {Directive, HostListener} from '@angular/core';

@Directive({
    selector: '[appPreventDoubleClick]'
})
export class PreventDoubleClickDirective {
    constructor() {
    }

    @HostListener('click', ['$event'])
    clickEvent(event) {
        // Deshabilita boton por 1 segundo para evitar dos veces una petición.
        event.currentTarget.setAttribute('disabled', true);
        const target = event.currentTarget;
        setTimeout(function c() {
            target.removeAttribute('disabled');
        }, 500);
    }
}
