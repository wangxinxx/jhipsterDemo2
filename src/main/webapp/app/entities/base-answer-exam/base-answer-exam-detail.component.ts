import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BaseAnswerExam } from './base-answer-exam.model';
import { BaseAnswerExamService } from './base-answer-exam.service';

@Component({
    selector: 'jhi-base-answer-exam-detail',
    templateUrl: './base-answer-exam-detail.component.html'
})
export class BaseAnswerExamDetailComponent implements OnInit, OnDestroy {

    baseAnswer: BaseAnswerExam;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private baseAnswerService: BaseAnswerExamService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBaseAnswers();
    }

    load(id) {
        this.baseAnswerService.find(id)
            .subscribe((baseAnswerResponse: HttpResponse<BaseAnswerExam>) => {
                this.baseAnswer = baseAnswerResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBaseAnswers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'baseAnswerListModification',
            (response) => this.load(this.baseAnswer.id)
        );
    }
}
