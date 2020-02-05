import {Component, Inject, Injectable} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AppprincComponent} from "../../appbase/appprinc/appprinc.component";
import {TranslateService} from "@ngx-translate/core";

export interface DialogData {
    animal: string;
    name: string;
}
@Component({templateUrl: './trabajadores.component.html'})

@Injectable()
export class TrabajadoresComponent  {
    constructor(public dialog: MatDialog) {}

    openDialog(): void {
        const dialogRef = this.dialog.open(TrabajadoresDialog, {
            width: '250px',
            data: {name: '' , animal: ''}
        });

        dialogRef.afterClosed().subscribe(result => {

        });
    }
}

@Component({
    selector: 'trabajadores-dialog',
    templateUrl: 'trabajadores-dialog.component.html',
})
export class TrabajadoresDialog {

    constructor(
        public dialogRef: MatDialogRef<TrabajadoresDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}
