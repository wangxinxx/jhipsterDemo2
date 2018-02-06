import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { UserAnswerExam } from './user-answer-exam.model';
import { UserAnswerExamService } from './user-answer-exam.service';

@Component({
    selector: 'jhi-user-answer-exam-detail',
    templateUrl: './user-answer-exam-detail.component.html'
})
export class UserAnswerExamDetailComponent implements OnInit, OnDestroy {

    userAnswer: UserAnswerExam;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private userAnswerService: UserAnswerExamService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserAnswers();
    }

    load(id) {
        this.userAnswerService.find(id)
            .subscribe((userAnswerResponse: HttpResponse<UserAnswerExam>) => {
                this.userAnswer = userAnswerResponse.body;
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

    registerChangeInUserAnswers() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userAnswerListModification',
            (response) => this.load(this.userAnswer.id)
        );
    }
}
