import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import Utils from '../../statics/utils';

@Injectable({
    providedIn: 'root'
})
export class AppLoadingService {
    private cargand = false;
    cargandoEstado: Subject<any> = new Subject();
    utils = Utils;

    get cargando(): boolean {
        return this.cargand;
    }

    set cargando(value) {
        this.cargand = value;
        this.cargandoEstado.next(value);
    }

    iniciarCargando() {
        this.cargando = true;
        this.utils.DesacScroll(null);
    }

    detenCargando() {
        this.cargando = false;
        this.utils.ActScroll();
    }
}
