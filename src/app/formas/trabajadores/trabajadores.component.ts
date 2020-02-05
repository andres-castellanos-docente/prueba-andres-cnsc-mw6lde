import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {
    derAIzAnimation,
    IzADerAnimation, subirAnimation
} from "../../animations/listanim.animations";

export interface DialogData {
    animal: string;
    name: string;
}
@Component({templateUrl: './trabajadores.component.html', animations: [derAIzAnimation, IzADerAnimation]}     )

@Injectable()
export class TrabajadoresComponent  {
    constructor(public dialog: MatDialog) {}
    openDialog(): void {
        const dialogRef = this.dialog.open(TrabajadoresDialog, {
            width: '320px',
            data: {name: '' , animal: ''}
        });
        debugger;
        dialogRef.afterClosed().subscribe(result => {
        });
    }
}

@Component({
    selector: 'trabajadores-dialog',
    templateUrl: 'trabajadores-dialog.component.html', animations: [derAIzAnimation, subirAnimation]
})
export class TrabajadoresDialog  implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<TrabajadoresDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    diagCarg = false;

    ngOnInit() {
        const self = this;
        setTimeout(function b() {
            self.diagCarg = true;
        }, 100);

    }
    onNoClick(): void {
        this.dialogRef.close();
    }

}
