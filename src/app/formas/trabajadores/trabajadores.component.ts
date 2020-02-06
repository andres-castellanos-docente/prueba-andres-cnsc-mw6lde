import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {
    bajarAnimationWait,
    derAIzAnimation,
    IzADerAnimation, subirAnimation
} from "../../animations/listanim.animations";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import Utils from "../../statics/utils";
import {TranslateService} from "@ngx-translate/core";
import {Moment} from "moment";
import {Message} from "primeng/api";


export interface DialogData {
    animal: string;
    name: string;
}

@Component({templateUrl: './trabajadores.component.html', animations: [derAIzAnimation, IzADerAnimation]})

@Injectable()
export class TrabajadoresComponent {
    constructor(public dialog: MatDialog) {
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(TrabajadoresDialog, {
            data: {name: '', animal: ''}
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }
}

@Component({
    selector: 'trabajadores-dialog',
    templateUrl: 'trabajadores-dialog.component.html', animations: [derAIzAnimation, subirAnimation, bajarAnimationWait]
})
export class TrabajadoresDialog implements OnInit {

    constructor(private formBuilder: FormBuilder,
                private translate: TranslateService,
                public dialogRef: MatDialogRef<TrabajadoresDialog>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    diagCarg = false;
    regCrearTrab: FormGroup;
    submittedCrearTrab = false;
    msgs: Message[] = [];

    ngOnInit() {
        // Espera para que se realicen las animaciones de lo contrario choca con la animacion al abrir el dialog.
        const self = this;
        setTimeout(function b() {
            self.diagCarg = true;
        }, 100);

        // Formulario Crear Trabajador
        this.regCrearTrab = this.formBuilder.group({
            idTrab: ['', null],
            nombreTrabaj: ['', Validators.required],
            fecNac: ['', Validators.required],
            edad: ['', Validators.required],
            edadMeses: new FormControl({value: '', disabled: true}, Validators.required),
            email: ['', Validators.compose([Validators.required, Validators.email])],
            direccion: ['', Validators.required],
            fecGrad: ['', Validators.required],
            exp: ['', Validators.required],
            expAnios: new FormControl({value: '', disabled: true}, Validators.required)
        });


    }

    validarFechaNac(fec: AbstractControl) {
        this.regCrearTrab.controls.edadMeses.setValue('');
        // Función que valida la fecha de expedicion si es una fecha correcta, de lo contrario resetea el valor.
        Utils.verificafechas(fec);
        this.calcularEdad();
    }


    // FUNCION PARA LOS COMPONENTES DATE
    validarFechasGrad(fec: AbstractControl) {
        this.regCrearTrab.controls.expAnios.setValue('');
        // Función que valida la fecha de expedicion si es una fecha correcta, de lo contrario resetea el valor.
        Utils.verificafechas(fec);
        this.calcularExp();
    }

    calcularEdad() {
        let fecNac: Moment;
        fecNac = this.regCrearTrab.controls.fecNac.value;
        if (fecNac) {
            const today = new Date();
            const dt1 = new Date(fecNac.year(), fecNac.month(), fecNac.date());
            const dt2 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const meses = Utils.restafechasMeses(dt1, dt2)
            this.regCrearTrab.controls.edad.setValue(meses);
            // Se realiza en un timeout para verse el cambio en la animacion el input
            const self = this;
            setTimeout(function b() {
                self.regCrearTrab.controls.edadMeses.setValue(meses + ' ' + self.translate.instant('crear.meses'));
            }, 100);
        }
    }

    calcularExp() {
        let fecGrad: Moment;
        fecGrad = this.regCrearTrab.controls.fecGrad.value;
        if (fecGrad) {
            const today = new Date();
            const dt1 = new Date(fecGrad.year(), fecGrad.month(), fecGrad.date());
            const dt2 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const anios = Utils.restafechasAnios(dt1, dt2)
            this.regCrearTrab.controls.exp.setValue(anios);
            // Se realiza en un timeout para verse el cambio en la animacion el input
            const self = this;
            setTimeout(function b() {
                self.regCrearTrab.controls.expAnios.setValue(anios + ' ' + self.translate.instant('crear.anios'));
            }, 100);
        }
    }

    onNoClick(): void {
        this.dialogRef.close();

    }
    async crear(){
        // Validacion campos
        this.msgs = [];
        this.submittedCrearTrab = true;
        if (this.regCrearTrab.invalid) {
            // Espera 400 millisegundos para que se vea el efecto del componente growl borrar mensajes
            await new Promise(resolve => setTimeout(resolve, 400));
            Utils.mostrarmess('warn', this.translate.instant('crear.debverf'), '😅', this.msgs);

            if (this.regCrearTrab.controls.nombreTrabaj.invalid) {
                Utils.mostrarmess('warn', '', '* ' + this.translate.instant('crear.nombrecomp'), this.msgs);
            }
            if (this.regCrearTrab.controls.fecNac.invalid) {
                Utils.mostrarmess('warn', '', '* ' + this.translate.instant('crear.fechanac'), this.msgs);
            }
            if (this.regCrearTrab.controls.direccion.invalid) {
                if (this.regCrearTrab.controls.direccion.value.trim() === '') {
                    Utils.mostrarmess('warn', '', '* ' + this.translate.instant('crear.direccion'), this.msgs);
                } else {
                    Utils.mostrarmess('warn', '', '* ' + this.translate.instant('crear.direccionformat'), this.msgs);
                    Utils.mostrarmess('warn', '',  this.translate.instant('crear.direccionformatdet'), this.msgs);
                }
            }
            if (this.regCrearTrab.controls.fecGrad.invalid) {
                Utils.mostrarmess('warn', '', '* ' + this.translate.instant('crear.fechagrad'), this.msgs);
            }
            if (this.regCrearTrab.controls.email.invalid) {
                if (this.regCrearTrab.controls.email.value.trim() === '') {
                    Utils.mostrarmess('warn', '', '* ' + this.translate.instant('crear.email'), this.msgs);
                } else {
                    Utils.mostrarmess('warn', '', '* ' + this.translate.instant('crear.emailformat'), this.msgs);
                    Utils.mostrarmess('warn', '',  this.translate.instant('crear.emailformatdet'), this.msgs);
                }
            }
            return;
        }
    }
}
