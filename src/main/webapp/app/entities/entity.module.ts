import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterDemo2BaseQuestionExamModule } from './base-question-exam/base-question-exam.module';
import { JhipsterDemo2BaseAnswerExamModule } from './base-answer-exam/base-answer-exam.module';
import { JhipsterDemo2UserAnswerExamModule } from './user-answer-exam/user-answer-exam.module';
import { JhipsterDemo2UserAnswerStatisticsExamModule } from './user-answer-statistics-exam/user-answer-statistics-exam.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterDemo2BaseQuestionExamModule,
        JhipsterDemo2BaseAnswerExamModule,
        JhipsterDemo2UserAnswerExamModule,
        JhipsterDemo2UserAnswerStatisticsExamModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterDemo2EntityModule {}
