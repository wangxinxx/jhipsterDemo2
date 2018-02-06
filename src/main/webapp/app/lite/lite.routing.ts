/**
 * Created by griga on 7/11/16.
 */

import {Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from './shared/layout/app-layouts/main-layout.component';
import {AuthLayoutComponent} from './shared/layout/app-layouts/auth-layout.component';
import {ModuleWithProviders} from '@angular/core';

export const routes: Routes = [
    {
        path: 'lite',
        component: MainLayoutComponent,
        children: [
            {
                path: '', redirectTo: 'home', pathMatch: 'full'
            },
            {
                path: 'home',
                loadChildren: './+home/home.module#HomeModule'
            },
        ]
    },

];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
