import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import {AppprincComponent} from "./appbase/appprinc/appprinc.component";
import {AppClockComponent} from "./appbase/appclock/app.clock.component";
import {AppFooterComponent} from "./appbase/appfooter/app.footer.component";
import {AppLoadingComponent} from "./appbase/apploading/app.loading.component";
import {AppMenuComponent, AppSubMenuComponent} from "./appbase/appmenu/app.menu.component";
import {AppSidebarComponent} from "./appbase/appsidebar/app.sidebar.component";
import {AppTopBarComponent} from "./appbase/apptopbar/app.topbar.component";
import {RouterModule} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {AppRoutes} from "./app.routes";
import {BlankComponent} from "./formas/blank/blank.component";
import {AppLoadingService} from "./appbase/apploading/app.loading.service";
import {AppXsegundoService} from "./appbase/appclock/app.xsegundo.service";
import {DatePipe} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule, HttpClientModule, ReactiveFormsModule,
    BrowserAnimationsModule, AppRoutes,
    TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  })],
  declarations: [AppComponent, AppprincComponent, AppClockComponent, AppFooterComponent, AppLoadingComponent, AppMenuComponent, AppSidebarComponent, AppTopBarComponent, AppSubMenuComponent, BlankComponent],
  providers: [AppXsegundoService, AppLoadingService, DatePipe],
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
