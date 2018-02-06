import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterDemo2SharedModule } from '../../shared';
import {
    UserAnswerStatisticsExamService,
    UserAnswerStatisticsExamPopupService,
    UserAnswerStatisticsExamComponent,
    UserAnswerStatisticsExamDetailComponent,
    UserAnswerStatisticsExamDialogComponent,
    UserAnswerStatisticsExamPopupComponent,
    UserAnswerStatisticsExamDeletePopupComponent,
    UserAnswerStatisticsExamDeleteDialogComponent,
    userAnswerStatisticsRoute,
    userAnswerStatisticsPopupRoute,
    UserAnswerStatisticsExamResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...userAnswerStatisticsRoute,
    ...userAnswerStatisticsPopupRoute,
];

@NgModule({
    imports: [
        JhipsterDemo2SharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserAnswerStatisticsExamComponent,
        UserAnswerStatisticsExamDetailComponent,
        UserAnswerStatisticsExamDialogComponent,
        UserAnswerStatisticsExamDeleteDialogComponent,
        UserAnswerStatisticsExamPopupComponent,
        UserAnswerStatisticsExamDeletePopupComponent,
    ],
    entryComponents: [
        UserAnswerStatisticsExamComponent,
        UserAnswerStatisticsExamDialogComponent,
        UserAnswerStatisticsExamPopupComponent,
        UserAnswerStatisticsExamDeleteDialogComponent,
        UserAnswerStatisticsExamDeletePopupComponent,
    ],
    providers: [
        UserAnswerStatisticsExamService,
        UserAnswerStatisticsExamPopupService,
        UserAnswerStatisticsExamResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterDemo2UserAnswerStatisticsExamModule {}
