import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MessagesModule} from "primeng/messages";
import {MessageModule} from "primeng/message";

@NgModule({
    imports: [
        BrowserModule, FormsModule, RouterModule, HttpClientModule, ReactiveFormsModule,
        BrowserAnimationsModule,  MatDialogModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
        MatTableModule,
        MatSnackBarModule,
        MessagesModule,
        MessageModule,
        MatMomentDateModule
    ],
    exports: [
        BrowserModule, FormsModule, RouterModule, HttpClientModule, ReactiveFormsModule,
        BrowserAnimationsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
        MatTableModule,
        MatSnackBarModule,
        MessagesModule,
        MessageModule,
        MatMomentDateModule
    ],
    declarations: [],
})
export class SharedModule { }
