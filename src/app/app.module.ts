import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {AppprincComponent} from "./appbase/appprinc/appprinc.component";
import {AppClockComponent} from "./appbase/appclock/app.clock.component";
import {AppFooterComponent} from "./appbase/appfooter/app.footer.component";
import {AppLoadingComponent} from "./appbase/apploading/app.loading.component";
import {AppMenuComponent, AppSubMenuComponent} from "./appbase/appmenu/app.menu.component";
import {AppSidebarComponent} from "./appbase/appsidebar/app.sidebar.component";
import {AppTopBarComponent} from "./appbase/apptopbar/app.topbar.component";
import {HttpClient} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {AppRoutes} from "./app.routes";
import {TrabajadoresComponent, TrabajadoresDialog} from "./formas/trabajadores/trabajadores.component";
import {AppLoadingService} from "./appbase/apploading/app.loading.service";
import {AppXsegundoService} from "./appbase/appclock/app.xsegundo.service";
import {DatePipe} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import {PreventDoubleClickDirective} from "./directives/buttonDoubleClick";
import {OnlyNumerosDirective} from "./directives/onlyNumeros";
import {OnlyDatesDirective} from "./directives/onlyDates";
import {OnlyStringsDirective} from "./directives/onlyStrings";
import {ConfirmDialogComponent} from "./appbase/confirm-dialog/confirm-dialog.component";
import {ConfirmDialogService} from "./appbase/confirm-dialog/confirm-dialog.service";
import {SharedModule} from "./shared.module";

@NgModule({
  imports: [ AppRoutes, SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })],
  entryComponents: [ConfirmDialogComponent,TrabajadoresDialog],
  declarations: [// Directivas
    PreventDoubleClickDirective, OnlyNumerosDirective, OnlyDatesDirective, OnlyStringsDirective,
    AppComponent, AppprincComponent, AppClockComponent, AppFooterComponent, AppLoadingComponent, AppMenuComponent, AppSidebarComponent, AppTopBarComponent, AppSubMenuComponent, ConfirmDialogComponent, TrabajadoresComponent, TrabajadoresDialog],
  providers: [AppXsegundoService, AppLoadingService, DatePipe, TranslateService,ConfirmDialogService, { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} }, {provide: MAT_DATE_LOCALE, useValue: navigator.language}],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
      http,
      `/assets/i18n/`,
      '.json'
  );
}
