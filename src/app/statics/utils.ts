import {AbstractControl} from "@angular/forms";

export default class Utils {
    static centrardialog(dialog: any) {
        if (dialog) {
            setTimeout(function b() {
                dialog.center();
            }, 30);
            setTimeout(function b() {
                dialog.center();
            }, 100);
        }
    }
    // desactiva el scroll  y centra los dialogos
    static DesacScroll(d: any) {
        if (d) {
            Utils.centrardialog(d);
            // Sobreescribe el evento onresize para centrar el dialogo, corrije problema en movil al girar el celular no los centraba y
            // cambiaba el tamaño de los dialogos.
            d.onWindowResize = function a() {
                setTimeout(function b() {
                    d.center();
                }, 100);
            };

        }

        if (document.documentElement.style.position !== 'fixed') {
            const topVerticalOffset = (typeof window.pageYOffset !== 'undefined') ?
                window.pageYOffset : (document.documentElement.scrollTop ?
                    document.documentElement.scrollTop : 0);
            document.documentElement.style.position = 'fixed';
            document.documentElement.style.marginTop = '-' + topVerticalOffset + 'px';
            document.documentElement.style.width = '100%';
        }
    }

    // activa el scrolltouch en ios
    static ActScroll() {
        if (document.documentElement.style.position === 'fixed') {
            document.documentElement.style.position = null;
            const scrollPosition = -1 * parseFloat(document.documentElement.style.marginTop);
            document.documentElement.style.marginTop = null;
            window.scrollTo(0, scrollPosition);
        }

    }

    static restafechasMeses(day2, day1)
    {
        let d1= day1,d2= day2;
        if(day1<day2){
            d1= day2;
            d2= day1;
        }
        let m= (d1.getFullYear()-d2.getFullYear())*12+(d1.getMonth()-d2.getMonth());
        if(d1.getDate()<d2.getDate()) --m;
        return m;
    }

    static restafechasAnios(day2, day1) {
        let ageDifMs = day1 - day2;
        let ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    static verificafechas(fec: AbstractControl) {
        // Funcion que valida que la fecha no sea mayor a la fecha actual
        // adicional la valida que la fecha no sea menor a la fecha actual  menos  120 años
        if (fec.valid) {
            // sustrae 120 años a la fecha actual
            const now = new Date();
            now.setDate(now.getDate() + 1);
            now.setHours(0, 0, 0, 0);
            const old = new Date();
            old.setFullYear(now.getFullYear() - 120);
            if (fec.value >= now) {
                fec.setValue('');
            } else if (fec.value <= old) {
                fec.setValue('');
            }
        } else {
            fec.setValue('');
        }
    }

    static scrollTop() {
        window.scroll(0, 0);
    }


    static mostrarmess(tipo: string, valor: string, detalle: string, msgs: any) {
        // Muestra mensajes en componente growl
        this.scrollTop();
        msgs.push({severity: tipo, summary: valor, detail: detalle});
    }






}
