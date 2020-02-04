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


    static scrollTop() {
        window.scroll(0, 0);
    }








}
