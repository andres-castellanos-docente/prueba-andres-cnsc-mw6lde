import {Component, OnInit} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
    name = "Angular";

    constructor(
        private translate: TranslateService) {
        translate.addLangs(['es']);
        const def = 'es';
        // Verifica el lenguaje del navegador para setear idioma.
        const getNavigatorLanguage: string = (navigator.languages && navigator.languages.length) ?
            navigator.languages[0] : navigator.language || def;
        let index = getNavigatorLanguage.indexOf('-');
        if (index === -1) {
            index = getNavigatorLanguage.length;
        }
        let lang = getNavigatorLanguage.substring(0, index);
        // verifica si no cumple ninguna de las dos setea por default.
        if ((lang !== 'es') && (lang !== 'en')) {
            lang = def;
        }
        lang = 'es';
        translate.setDefaultLang(lang);
        translate.use(lang);
    }

    ngOnInit() {
    }
}
