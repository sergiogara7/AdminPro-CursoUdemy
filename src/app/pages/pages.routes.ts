import { RouterModule,Routes } from '@angular/router';

import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

import { LoginGuardGuard } from '../services/service.index';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuardGuard ],
        children: [
            {path: 'dashboard',component: DashboardComponent, data:{titulo:'Inicio'}},
            {path: 'progress',component: ProgressComponent, data:{titulo:'Progreso'}},
            {path: 'graficas1',component: Graficas1Component, data:{titulo:'Reportes'}},
            {path: 'promesas',component: PromesasComponent, data:{titulo:'Promesas'}},
            {path: 'rxjs',component: RxjsComponent, data:{titulo:'Rxjs'}},
            {path: 'account-settings',component: AccountSettingsComponent, data:{titulo:'Ajustes Tema'}},
            {path: 'perfil',component: ProfileComponent, data:{titulo:'Mi perfil'}},
            {path: '',redirectTo: '/dashboard',pathMatch: 'full'},
        ]
    }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);