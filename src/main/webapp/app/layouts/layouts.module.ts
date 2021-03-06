import {Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {JhiEventManager} from 'ng-jhipster';
import {LocalStorageService, Ng2Webstorage, SessionStorageService} from 'ngx-webstorage';

import {JhipsterDemo2SharedModule, UserRouteAccessService} from '../shared';
import {ErrorComponent, FooterComponent, JhiMainComponent, NavbarComponent, PageRibbonComponent, ProfileService} from './index';
import {NotificationInterceptor} from '../blocks/interceptor/notification.interceptor';
import {ErrorHandlerInterceptor} from '../blocks/interceptor/errorhandler.interceptor';

import {JhipsterDemo2HomeModule} from '../home/home.module';
import {AuthInterceptor} from '../blocks/interceptor/auth.interceptor';

import {AuthExpiredInterceptor} from '../blocks/interceptor/auth-expired.interceptor';
import {JhipsterDemo2EntityModule} from '../entities/entity.module';

import {LAYOUTS_ROUTES} from './layouts-routing.module';

@NgModule({
    imports: [
        BrowserModule,
        JhipsterDemo2SharedModule,
        JhipsterDemo2HomeModule,
        JhipsterDemo2EntityModule,
        RouterModule.forChild(LAYOUTS_ROUTES)
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        FooterComponent
    ],
    providers: [
        ProfileService,
        UserRouteAccessService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
            deps: [
                LocalStorageService,
                SessionStorageService
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true,
            deps: [
                JhiEventManager
            ]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true,
            deps: [
                Injector
            ]
        }
    ],
    bootstrap: [ JhiMainComponent ]
})
export class JhipsterDemo2LayoutsModule {}
