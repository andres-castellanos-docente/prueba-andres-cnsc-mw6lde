import {Directive, HostListener} from '@angular/core';

@Directive({
    selector: '[appOnlyDates]'
})
export class OnlyDatesDirective {
    // previene caracteres especiales en todos los input de tipo 'fechas' sólo permite números positivos más el signo /
    // o previene pegar informacion que contenga strings sólo permite fechas
    @HostListener('keydown', ['$event'])
    keydownEvent(event) {
        // única combinación de carecteres permitidos
        // más ctrl + c , ctrl + v ,ctrl + x,ctrl + z, ctrl + a, ctrl + e, Tab, Borrar, Suprimir, Flechas
        const invalidChars = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '/', 'Tab', 'ArrowLeft', 'ArrowRight',
            'Home', 'End', 'Enter', 'Backspace', 'Delete', 'Control', 'Shift', 'Meta'];
        const permit = ['C', 'V', 'X', 'Z', 'A', 'E'];
        if (event.key) {
            if ((event.metaKey) && (permit.indexOf(event.key.toUpperCase()) > -1)) {
            } else if ((event.ctrlKey) && (permit.indexOf(event.key.toUpperCase()) > -1)) {
            } else if (invalidChars.indexOf(event.key) === -1) {
                event.preventDefault();
            }
        }
    }

    @HostListener('paste', ['$event']) pasteEvent(event) {
        // verifica con la expresión regular de fechas y si contiene texto no permite pegar
        if (event.clipboardData.getData('text').match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
        } else {
            event.preventDefault();
        }
    }
}
