import {FormControl, Validators} from "@angular/forms";

export class trabajadorModel {
    nombreTrabaj: string;
    fecNac: Date;
    edad: Number;
    email: string;
    direccion: string;
    fecGrad: Date;
    exp: Number;

    constructor(json: any = null) {
        if (json !== null) {
            this.nombreTrabaj = json.nombreTrabaj;
            this.fecNac = json.fecNac;
            this.edad = json.edad;
            this.email = json.email;
            this.direccion = json.direccion;
            this.fecGrad = json.fecGrad;
            this.exp = json.exp;
        } else {
            this.nombreTrabaj = '';
            this.fecNac = null;
            this.edad = null;
            this.email = '';
            this.direccion = '';
            this.fecGrad = null;
            this.exp = null;
        }
        /*else {
            this.nombreTrabaj = 'andres robaneski';
            this.fecNac = null;
            this.edad = null;
            this.email = 'andresrobanesky@gmail.com';
            this.direccion = 'calle 22-4-4';
            this.fecGrad = null;
            this.exp = null;
        }*/
    }
}
