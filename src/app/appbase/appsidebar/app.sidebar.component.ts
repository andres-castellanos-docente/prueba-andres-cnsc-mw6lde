import {Component, OnInit, AfterViewInit} from '@angular/core';
import {AppprincComponent} from '../appprinc/appprinc.component';
import Utils from '../../statics/utils';
import {derAIzAderButAnimation, subirAnimation} from '../../animations/listanim.animations';


@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html', styleUrls: ['./app.sidebar.scss'],
    animations: [subirAnimation, derAIzAderButAnimation]
})
export class AppSidebarComponent implements OnInit, AfterViewInit {
    model: any[];
    utils = Utils;

    constructor(public app: AppprincComponent) {
    }

    ngAfterViewInit() {
        const self = this;
        setTimeout(() => {
            // no prestar atencion al warning argumento que falta
            if (window.innerWidth >= 1280) {
               // self.app.sidebarActive = true;
            }
        }, 1000);
    }

    ngOnInit() {


    }


}

