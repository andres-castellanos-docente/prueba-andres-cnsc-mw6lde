import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ConfirmDialogComponent } from './confirm-dialog.component';
@Injectable()
export class ConfirmDialogService {
    constructor(private dialog: MatDialog) { }
    dialogRef: MatDialogRef<ConfirmDialogComponent>;

    public open(options) {
        this.dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
                title: options.title,
                message: options.message
            }
        });
    }
    public confirmed(): Observable<any> {

        return this.dialogRef.afterClosed().pipe(take(1), map(res => {
                return res;
            }
        ));
    }
}
