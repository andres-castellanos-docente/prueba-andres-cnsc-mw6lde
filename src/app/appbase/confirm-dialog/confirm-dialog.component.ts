import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Component, OnInit, Inject} from '@angular/core';
import {bajarAnimation, derAIzAnimation, IzADerAnimation, subirAnimation} from "../../animations/listanim.animations";

@Component({
    selector: 'app-confirm-dialog',
    animations: [derAIzAnimation, IzADerAnimation, subirAnimation, bajarAnimation],
    templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent implements OnInit {
    title: string;
    message: string;
    diagCarg = false;

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        this.title = data.title;
        this.message = data.message;
    }

    ngOnInit() {
        // Espera para que se realicen las animaciones de lo contrario choca con la animacion al abrir el dialog.
        const self = this;
        setTimeout(function b() {
            self.diagCarg = true;
        }, 100);
    }

    onConfirm(): void {
        this.dialogRef.close(true);
    }

    onDismiss(): void {
        this.dialogRef.close(false);
    }
}

export class ConfirmDialogModel {

    constructor(public title: string, public message: string) {
    }
}
