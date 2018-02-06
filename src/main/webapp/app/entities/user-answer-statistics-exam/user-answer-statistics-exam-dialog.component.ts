import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UserAnswerStatisticsExam } from './user-answer-statistics-exam.model';
import { UserAnswerStatisticsExamPopupService } from './user-answer-statistics-exam-popup.service';
import { UserAnswerStatisticsExamService } from './user-answer-statistics-exam.service';
import { BaseQuestionExam, BaseQuestionExamService } from '../base-question-exam';

@Component({
    selector: 'jhi-user-answer-statistics-exam-dialog',
    templateUrl: './user-answer-statistics-exam-dialog.component.html'
})
export class UserAnswerStatisticsExamDialogComponent implements OnInit {

    userAnswerStatistics: UserAnswerStatisticsExam;
    isSaving: boolean;

    basequestions: BaseQuestionExam[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private userAnswerStatisticsService: UserAnswerStatisticsExamService,
        private baseQuestionService: BaseQuestionExamService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.baseQuestionService.query()
            .subscribe((res: HttpResponse<BaseQuestionExam[]>) => { this.basequestions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userAnswerStatistics.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userAnswerStatisticsService.update(this.userAnswerStatistics));
        } else {
            this.subscribeToSaveResponse(
                this.userAnswerStatisticsService.create(this.userAnswerStatistics));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UserAnswerStatisticsExam>>) {
        result.subscribe((res: HttpResponse<UserAnswerStatisticsExam>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UserAnswerStatisticsExam) {
        this.eventManager.broadcast({ name: 'userAnswerStatisticsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBaseQuestionById(index: number, item: BaseQuestionExam) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-user-answer-statistics-exam-popup',
    template: ''
})
export class UserAnswerStatisticsExamPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userAnswerStatisticsPopupService: UserAnswerStatisticsExamPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userAnswerStatisticsPopupService
                    .open(UserAnswerStatisticsExamDialogComponent as Component, params['id']);
            } else {
                this.userAnswerStatisticsPopupService
                    .open(UserAnswerStatisticsExamDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
