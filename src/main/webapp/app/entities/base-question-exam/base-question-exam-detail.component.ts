import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { BaseQuestionExam } from './base-question-exam.model';
import { BaseQuestionExamService } from './base-question-exam.service';

@Component({
    selector: 'jhi-base-question-exam-detail',
    templateUrl: './base-question-exam-detail.component.html'
})
export class BaseQuestionExamDetailComponent implements OnInit, OnDestroy {

    baseQuestion: BaseQuestionExam;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private baseQuestionService: BaseQuestionExamService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBaseQuestions();
    }

    load(id) {
        this.baseQuestionService.find(id)
            .subscribe((baseQuestionResponse: HttpResponse<BaseQuestionExam>) => {
                this.baseQuestion = baseQuestionResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBaseQuestions() {
        this.eventSubscriber = this.eventManager.subscribe(
            'baseQuestionListModification',
            (response) => this.load(this.baseQuestion.id)
        );
    }
}
