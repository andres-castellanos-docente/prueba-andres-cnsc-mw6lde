import {Component, OnInit} from '@angular/core';
import {AppXsegundoService, valorReloj} from './app.xsegundo.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-clock',
    templateUrl: './app.clock.component.html',
    styleUrls: ['./app.clock.component.css']
})
export class AppClockComponent implements OnInit {
    datos$: Observable<valorReloj>;
    hora: number;
    minutos: string;
    dia: string;
    fecha: string;
    ampm: string;
    segundos: string;


    constructor(private segundo: AppXsegundoService) {
    }

    ngOnInit() {
        this.datos$ = this.segundo.getInfoReloj();
        this.datos$.subscribe(x => {
            this.hora = x.hora;
            this.minutos = x.minutos;
            this.dia = x.diadesemana;
            this.fecha = x.diaymes;
            this.ampm = x.ampm;
            this.segundos = x.segundo;
        });
    }

}
