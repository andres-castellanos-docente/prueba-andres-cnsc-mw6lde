import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AppLoadingService} from './app.loading.service';
@Component({
    selector: 'app-cargando',
    templateUrl: './app.loading.component.html'
})

export class AppLoadingComponent implements OnInit, OnDestroy {
    constructor(private cargandoService: AppLoadingService) {
    }

    cargando = false;
    loadingSubscription: Subscription;

    ngOnInit() {
        this.loadingSubscription = this.cargandoService.cargandoEstado.subscribe((value) => {
            this.cargando = value;
        });
    }

    ngOnDestroy() {
        this.loadingSubscription.unsubscribe();
    }



}
