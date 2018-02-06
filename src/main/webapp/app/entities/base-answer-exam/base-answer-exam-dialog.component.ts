import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BaseAnswerExam } from './base-answer-exam.model';
import { BaseAnswerExamPopupService } from './base-answer-exam-popup.service';
import { BaseAnswerExamService } from './base-answer-exam.service';
import { BaseQuestionExam, BaseQuestionExamService } from '../base-question-exam';

@Component({
    selector: 'jhi-base-answer-exam-dialog',
    templateUrl: './base-answer-exam-dialog.component.html'
})
export class BaseAnswerExamDialogComponent implements OnInit {

    baseAnswer: BaseAnswerExam;
    isSaving: boolean;

    basequestions: BaseQuestionExam[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private baseAnswerService: BaseAnswerExamService,
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
        if (this.baseAnswer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.baseAnswerService.update(this.baseAnswer));
        } else {
            this.subscribeToSaveResponse(
                this.baseAnswerService.create(this.baseAnswer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BaseAnswerExam>>) {
        result.subscribe((res: HttpResponse<BaseAnswerExam>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BaseAnswerExam) {
        this.eventManager.broadcast({ name: 'baseAnswerListModification', content: 'OK'});
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
    selector: 'jhi-base-answer-exam-popup',
    template: ''
})
export class BaseAnswerExamPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private baseAnswerPopupService: BaseAnswerExamPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.baseAnswerPopupService
                    .open(BaseAnswerExamDialogComponent as Component, params['id']);
            } else {
                this.baseAnswerPopupService
                    .open(BaseAnswerExamDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
