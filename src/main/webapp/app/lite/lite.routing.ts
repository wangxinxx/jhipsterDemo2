/**
 * Created by griga on 7/11/16.
 */

import {Routes, RouterModule} from '@angular/router';
import {MainLayoutComponent} from './shared/layout/app-layouts/main-layout.component';
import {AuthLayoutComponent} from './shared/layout/app-layouts/auth-layout.component';
import {ModuleWithProviders} from '@angular/core';
import {JhipsterDemo2BaseQuestionExamModule} from '../entities/base-question-exam/base-question-exam.module';

export const liteRoutes: Routes = [
    {
        path: 'admin',
        component: MainLayoutComponent,
        children: [
            {
                path: 'question',
                loadChildren: '../entities/base-question-exam/base-question-exam.module#JhipsterDemo2BaseQuestionExamModule'
            },
            {
                path: '',
                loadChildren: './+home/home.module#HomeModule'
            },
        ]
    },

];

// export const routing: ModuleWithProviders = RouterModule.forChild(routes);
