import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterDemo2SharedModule } from '../shared';

import { HomeComponent } from './';
import {HOME_ROUTE} from './home.route';

@NgModule({
    imports: [
        JhipsterDemo2SharedModule,
        RouterModule.forChild([ HOME_ROUTE ])
    ],
    declarations: [
        HomeComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterDemo2HomeModule {}
