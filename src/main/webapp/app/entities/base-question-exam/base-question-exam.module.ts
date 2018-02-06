import {NgModule, CUSTOM_ELEMENTS_SCHEMA, Injector} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import { JhipsterDemo2SharedModule } from '../../shared';
import {
    BaseQuestionExamService,
    BaseQuestionExamPopupService,
    BaseQuestionExamComponent,
    BaseQuestionExamDetailComponent,
    BaseQuestionExamDialogComponent,
    BaseQuestionExamPopupComponent,
    BaseQuestionExamDeletePopupComponent,
    BaseQuestionExamDeleteDialogComponent,
    baseQuestionRoute,
    baseQuestionPopupRoute,
    BaseQuestionExamResolvePagingParams,
} from './';
import {AuthExpiredInterceptor} from '../../blocks/interceptor/auth-expired.interceptor';
import {ErrorHandlerInterceptor} from '../../blocks/interceptor/errorhandler.interceptor';
import {JhiEventManager} from 'ng-jhipster';
import {AuthInterceptor} from '../../blocks/interceptor/auth.interceptor';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {NotificationInterceptor} from '../../blocks/interceptor/notification.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

const ENTITY_STATES: Routes = [
    ...baseQuestionRoute,
    ...baseQuestionPopupRoute,
];

@NgModule({
    imports: [
        JhipsterDemo2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BaseQuestionExamComponent,
        BaseQuestionExamDetailComponent,
        BaseQuestionExamDialogComponent,
        BaseQuestionExamDeleteDialogComponent,
        BaseQuestionExamPopupComponent,
        BaseQuestionExamDeletePopupComponent,
    ],
    entryComponents: [
        BaseQuestionExamComponent,
        BaseQuestionExamDialogComponent,
        BaseQuestionExamPopupComponent,
        BaseQuestionExamDeleteDialogComponent,
        BaseQuestionExamDeletePopupComponent,
    ],
    providers: [
        BaseQuestionExamService,
        BaseQuestionExamPopupService,
        BaseQuestionExamResolvePagingParams,
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
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterDemo2BaseQuestionExamModule {}
