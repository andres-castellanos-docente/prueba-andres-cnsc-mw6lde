import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {AppprincComponent} from "./appbase/appprinc/appprinc.component";
import {TrabajadoresComponent} from "./formas/trabajadores/trabajadores.component";


export const routes: Routes = [
    {

        path: '', component: AppprincComponent,
        children: [
            {path: '', component: TrabajadoresComponent, canActivate: []},
            {path: 'trabaj', component: TrabajadoresComponent, canActivate: []}]
    },
    {path: '**', redirectTo: ''}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
