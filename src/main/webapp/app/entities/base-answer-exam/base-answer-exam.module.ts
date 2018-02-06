import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterDemo2SharedModule } from '../../shared';
import {
    BaseAnswerExamService,
    BaseAnswerExamPopupService,
    BaseAnswerExamComponent,
    BaseAnswerExamDetailComponent,
    BaseAnswerExamDialogComponent,
    BaseAnswerExamPopupComponent,
    BaseAnswerExamDeletePopupComponent,
    BaseAnswerExamDeleteDialogComponent,
    baseAnswerRoute,
    baseAnswerPopupRoute,
    BaseAnswerExamResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...baseAnswerRoute,
    ...baseAnswerPopupRoute,
];

@NgModule({
    imports: [
        JhipsterDemo2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BaseAnswerExamComponent,
        BaseAnswerExamDetailComponent,
        BaseAnswerExamDialogComponent,
        BaseAnswerExamDeleteDialogComponent,
        BaseAnswerExamPopupComponent,
        BaseAnswerExamDeletePopupComponent,
    ],
    entryComponents: [
        BaseAnswerExamComponent,
        BaseAnswerExamDialogComponent,
        BaseAnswerExamPopupComponent,
        BaseAnswerExamDeleteDialogComponent,
        BaseAnswerExamDeletePopupComponent,
    ],
    providers: [
        BaseAnswerExamService,
        BaseAnswerExamPopupService,
        BaseAnswerExamResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterDemo2BaseAnswerExamModule {}
