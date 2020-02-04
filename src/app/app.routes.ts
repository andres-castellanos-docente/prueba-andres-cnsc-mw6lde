import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AppprincComponent} from "./appbase/appprinc/appprinc.component";
import {BlankComponent} from "./formas/blank/blank.component";


export const routes: Routes = [
    {

        path: '', component: AppprincComponent,
        children: [
            {path: '', component: BlankComponent, canActivate: []}]
    },
    {path: '**', redirectTo: ''}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
