import {JhiMainComponent} from './main/main.component';
import {Routes} from '@angular/router';

export const LAYOUTS_ROUTES: Routes = [
    {
        path: 'index',
        component: JhiMainComponent,
        children: [
            {
                path: '',
                loadChildren: '../home/home.module#JhipsterDemo2HomeModule'
            }
        ]
    }
];
