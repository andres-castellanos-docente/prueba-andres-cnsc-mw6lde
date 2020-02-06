import {Directive, HostListener} from '@angular/core';

@Directive({
    selector: '[appOnlyNumbers]'
})
export class OnlyNumerosDirective {
    @HostListener('keydown', ['$event'])
    keydownEvent(event) {
        // única combinación de carecteres permitidos
        // más ctrl + c , ctrl + v ,ctrl + x,ctrl + z, ctrl + a, ctrl + e, Tab, Borrar, Suprimir, Flechas
        const validChars = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Tab', 'ArrowLeft', 'ArrowRight',
            'Home', 'End', 'Enter', 'Backspace', 'Delete', 'Control', 'Shift', 'Meta'];
        // única combinación de carecteres permitidos
        // más ctrl + c , ctrl + v ,ctrl + x,ctrl + z, ctrl + a, ctrl + e, Tab, Borrar, Suprimir, Flechas incluida arriba abajo para el spin
        const validCharsUp = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp',
            'ArrowDown', 'Home', 'End', 'Enter', 'Backspace', 'Delete', 'Control', 'Shift', 'Meta'];
        const permit = ['C', 'V', 'X', 'Z', 'A', 'E'];
        let invalidCharsLocal = [];
        if (event.key) {
            // Verifica que si la clase number esta ocultando el spin, para permitir o no las teclas arriba y abajo y aumentar o disminuir
            // El valor. De lo contrario las restringe
            if (event.currentTarget.classList.contains('nospin')) {
                invalidCharsLocal = validChars;
            } else {
                invalidCharsLocal = validCharsUp;
            }
            const valor = event.currentTarget.value;
            if ((event.metaKey) && (permit.indexOf(event.key.toUpperCase()) > -1)) {
            } else if ((event.ctrlKey) && (permit.indexOf(event.key.toUpperCase()) > -1)) {
            } else if (invalidCharsLocal.indexOf(event.key) === -1) {
                event.preventDefault();
            } else if ((event.key === '0') && (valor === '0')) {
                // previene digitar 00000000
                event.preventDefault();
            }
        }
    }

    @HostListener('paste', ['$event']) pasteEvent(event) {
        if (event.clipboardData.getData('text').match(/[^\d]/)) {
            event.preventDefault();
        }
    }
}
