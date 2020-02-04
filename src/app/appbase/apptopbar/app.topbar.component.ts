import {Component, OnInit} from '@angular/core';
import {
    derAIzAderButAnimation,
    derAIzAnimation,
    IzADerAnimation
} from '../../animations/listanim.animations';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html', styleUrls: ['./app.topbar.scss'],
    animations: [derAIzAnimation, IzADerAnimation, derAIzAderButAnimation]
})
export class AppTopBarComponent implements OnInit {

    ngOnInit() {
    }
}
