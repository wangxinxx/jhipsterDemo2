import './vendor.ts';

import { NgModule, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { Ng2Webstorage, LocalStorageService, SessionStorageService  } from 'ngx-webstorage';
import { JhiEventManager } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { JhipsterDemo2SharedModule, UserRouteAccessService } from './shared';
import { JhipsterDemo2AppRoutingModule} from './app-routing.module';
import { JhipsterDemo2HomeModule } from './home/home.module';
import { JhipsterDemo2AdminModule } from './admin/admin.module';
import { JhipsterDemo2AccountModule } from './account/account.module';
import { JhipsterDemo2EntityModule } from './entities/entity.module';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
// jhipster-needle-angular-add-module-import JHipster will add new module here

import {AppModule} from './lite/lite.module';
import {JhiIndexComponent} from './index.component';
import {JhipsterDemo2LayoutsModule} from './layouts/layouts.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        JhipsterDemo2AppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        JhipsterDemo2SharedModule,
        // JhipsterDemo2AdminModule,
        // JhipsterDemo2EntityModule,
        AppModule,
        JhipsterDemo2LayoutsModule
        // jhipster-needle-angular-add-module JHipster will add new module here
    ],
    declarations: [
        JhiIndexComponent
    ],
    providers: [
        PaginationConfig,
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
    bootstrap: [ JhiIndexComponent ]
})
export class JhipsterDemo2AppModule {}
