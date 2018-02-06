import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { UserAnswerExam } from './user-answer-exam.model';
import { UserAnswerExamPopupService } from './user-answer-exam-popup.service';
import { UserAnswerExamService } from './user-answer-exam.service';
import { BaseQuestionExam, BaseQuestionExamService } from '../base-question-exam';

@Component({
    selector: 'jhi-user-answer-exam-dialog',
    templateUrl: './user-answer-exam-dialog.component.html'
})
export class UserAnswerExamDialogComponent implements OnInit {

    userAnswer: UserAnswerExam;
    isSaving: boolean;

    basequestions: BaseQuestionExam[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private userAnswerService: UserAnswerExamService,
        private baseQuestionService: BaseQuestionExamService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.baseQuestionService.query()
            .subscribe((res: HttpResponse<BaseQuestionExam[]>) => { this.basequestions = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.userAnswer.id !== undefined) {
            this.subscribeToSaveResponse(
                this.userAnswerService.update(this.userAnswer));
        } else {
            this.subscribeToSaveResponse(
                this.userAnswerService.create(this.userAnswer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UserAnswerExam>>) {
        result.subscribe((res: HttpResponse<UserAnswerExam>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UserAnswerExam) {
        this.eventManager.broadcast({ name: 'userAnswerListModification', content: 'OK'});
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
    selector: 'jhi-user-answer-exam-popup',
    template: ''
})
export class UserAnswerExamPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userAnswerPopupService: UserAnswerExamPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.userAnswerPopupService
                    .open(UserAnswerExamDialogComponent as Component, params['id']);
            } else {
                this.userAnswerPopupService
                    .open(UserAnswerExamDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
