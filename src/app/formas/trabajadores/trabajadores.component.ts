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
import {Message} from "primeng/api";
import {trabajadorModel} from "./trabajador.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../../appbase/confirm-dialog/confirm-dialog.component";



export interface DialogData {
    animal: string;
    name: string;
}

@Component({
    templateUrl: './trabajadores.component.html',
    animations: [derAIzAnimation, IzADerAnimation, subirAnimation]
})

@Injectable()
export class TrabajadoresComponent implements OnInit {
    trabNew: trabajadorModel;
    listatrab: trabajadorModel[] = [];
    dataSource: MatTableDataSource<trabajadorModel>;
    displayedColumns: string[] = ['nombreTrabaj', 'fecNac', 'edad', 'direccion', 'fecGrad', 'exp', 'email', 'editar', 'elim'];

    constructor(public dialog: MatDialog,public dialogconf: MatDialog, private translate: TranslateService, private snackBar: MatSnackBar) {
        this.trabNew = new trabajadorModel();
    }

    ngOnInit() {
        const items = localStorage.getItem('items');
        if (items) {
            this.listatrab = JSON.parse(items);
            this.dataSource = new MatTableDataSource<trabajadorModel>(this.listatrab);
        }
    }

    eliminar(ele: number) {
        const message = this.translate.instant('crear.confelim');
        const dialogData = new ConfirmDialogModel(this.translate.instant('crear.conftit'), message);

        const dialogRef = this.dialogconf.open(ConfirmDialogComponent, {
            maxWidth: "400px",
            data:  {title: this.translate.instant('crear.conftit'),
                message: message
        }
        });
        dialogRef.afterClosed().subscribe(dialogResult => {
            const resp = dialogResult;
            if (resp === true) {
                this.eliminarconf(ele);
            }
        });
    }

    eliminarconf(ele: number) {
        this.listatrab.splice(ele, 1);
        this.dataSource = new MatTableDataSource<trabajadorModel>(this.listatrab);
        localStorage.setItem('items', JSON.stringify(this.listatrab));
        this.snackBar.open(this.translate.instant('crear.elimin'), '', {
            duration: 2000,
        });
    }

    crearDialog(): void {
        const dialogRef = this.dialog.open(TrabajadoresDialog, {
            data: {trabajadorModel: this.trabNew, creando: true}
        });
        dialogRef.afterClosed().subscribe(result => {
            const trabcrea: any = result;
            //this.listatrab.push({ nombreTrabaj: trabcrea.nombreTrabaj, fecNac: null, edad: trabcrea.edad, fecGrad: null, exp: trabcrea.exp, direccion: trabcrea.direccion, email: trabcrea.email });
            if (trabcrea) {
                this.listatrab.push(trabcrea);
                //this.listatrab.concat(trabcrea);
                localStorage.setItem('items', JSON.stringify(this.listatrab));
                this.dataSource = new MatTableDataSource<trabajadorModel>(this.listatrab);
                this.snackBar.open(this.translate.instant('crear.cread'), '', {
                    duration: 2000,
                });
            }
        });
    }


    editarDialog(trab: trabajadorModel, index: number) {
        const dialogRef = this.dialog.open(TrabajadoresDialog, {
            data: {trabajadorModel: trab, creando: false}
        });
        dialogRef.afterClosed().subscribe(result => {
            const trabedit: any = result;
            //this.listatrab.push({ nombreTrabaj: trabcrea.nombreTrabaj, fecNac: null, edad: trabcrea.edad, fecGrad: null, exp: trabcrea.exp, direccion: trabcrea.direccion, email: trabcrea.email });
            if (trabedit) {
                //this.listatrab.push(trabcrea);
                //this.listatrab.concat(trabcrea);

                this.listatrab[index] = trabedit;

                localStorage.setItem('items', JSON.stringify(this.listatrab));
                this.dataSource = new MatTableDataSource<trabajadorModel>(this.listatrab);
                this.snackBar.open(this.translate.instant('crear.editad'), '', {
                    duration: 2000,
                });
            }
        });
    }


}

@Component({
    selector: 'trabajadores-dialog',
    templateUrl: 'trabajadores-dialog.component.html', animations: [derAIzAnimation, subirAnimation, bajarAnimationWait]
})
export class TrabajadoresDialog implements OnInit {
    trab: trabajadorModel;
    creando: boolean;

    constructor(private formBuilder: FormBuilder,
                private translate: TranslateService,
                public dialogRef: MatDialogRef<TrabajadoresDialog>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        const datany: any = data;
        const trab = datany.trabajadorModel;
        this.creando = datany.creando;
        this.trab = trab;
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
        let fecGrad;
        let fecNac;
        if (!this.creando) {
            fecGrad = new Date(this.trab.fecGrad);
            fecNac = new Date(this.trab.fecNac);
        } else {
            fecGrad = '';
            fecNac = '';
        }
        // Formulario Crear Trabajador
        this.regCrearTrab = this.formBuilder.group({
            nombreTrabaj: [this.trab.nombreTrabaj, Validators.required],
            fecNac: [fecNac, Validators.required],
            edad: [this.trab.edad, Validators.required],
            edadMeses: new FormControl({value: '', disabled: true}, Validators.required),
            email: [this.trab.email, Validators.compose([Validators.required, Validators.email])],
            direccion: [this.trab.direccion, Validators.required],
            fecGrad: [fecGrad, Validators.required],
            exp: [this.trab.exp, Validators.required],
            expAnios: new FormControl({value: '', disabled: true}, Validators.required)
        });

        if (this.creando === false) {
            this.calcularEdad();
            this.calcularExp();
        }
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
        let fecNac: any;
        fecNac = this.regCrearTrab.controls.fecNac.value;
        if (fecNac) {
            const today = new Date();
            let dt1;
            if (fecNac._isAMomentObject === true) {
                dt1 = new Date(fecNac.year(), fecNac.month(), fecNac.date());
            } else {
                dt1 = new Date(fecNac.getFullYear(), fecNac.getMonth(), fecNac.getDate());
            }
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
        let fecGrad: any;
        fecGrad = this.regCrearTrab.controls.fecGrad.value;
        if (fecGrad) {
            const today = new Date();
            let dt1;
            if (fecGrad._isAMomentObject === true) {
                dt1 = new Date(fecGrad.year(), fecGrad.month(), fecGrad.date());
            } else {
                dt1 = new Date(fecGrad.getFullYear(), fecGrad.getMonth(), fecGrad.getDate());
            }
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

    async creareditar() {
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
                    Utils.mostrarmess('warn', '', this.translate.instant('crear.direccionformatdet'), this.msgs);
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
                    Utils.mostrarmess('warn', '', this.translate.instant('crear.emailformatdet'), this.msgs);
                }
            }
            return;
        }
        this.dialogRef.close(this.regCrearTrab.value);
    }
}
