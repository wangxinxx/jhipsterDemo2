import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UserAnswerStatisticsExam } from './user-answer-statistics-exam.model';
import { UserAnswerStatisticsExamService } from './user-answer-statistics-exam.service';

@Component({
    selector: 'jhi-user-answer-statistics-exam-detail',
    templateUrl: './user-answer-statistics-exam-detail.component.html'
})
export class UserAnswerStatisticsExamDetailComponent implements OnInit, OnDestroy {

    userAnswerStatistics: UserAnswerStatisticsExam;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private userAnswerStatisticsService: UserAnswerStatisticsExamService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserAnswerStatistics();
    }

    load(id) {
        this.userAnswerStatisticsService.find(id)
            .subscribe((userAnswerStatisticsResponse: HttpResponse<UserAnswerStatisticsExam>) => {
                this.userAnswerStatistics = userAnswerStatisticsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserAnswerStatistics() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userAnswerStatisticsListModification',
            (response) => this.load(this.userAnswerStatistics.id)
        );
    }
}
