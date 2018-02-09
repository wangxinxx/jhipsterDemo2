import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {errorRoute} from './layouts';
import { DEBUG_INFO_ENABLED } from './app.constants';
import {navbarRoute} from './app.route';

const APP_ROUTES: Routes = [
    navbarRoute,
    ...errorRoute, {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(APP_ROUTES, { useHash: true , enableTracing: DEBUG_INFO_ENABLED })
    ],
    exports: [
        RouterModule
    ]
})
export class JhipsterDemo2AppRoutingModule {}
