import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { BaseQuestionExam } from './base-question-exam.model';
import { BaseQuestionExamPopupService } from './base-question-exam-popup.service';
import { BaseQuestionExamService } from './base-question-exam.service';

@Component({
    selector: 'jhi-base-question-exam-dialog',
    templateUrl: './base-question-exam-dialog.component.html'
})
export class BaseQuestionExamDialogComponent implements OnInit {

    baseQuestion: BaseQuestionExam;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private baseQuestionService: BaseQuestionExamService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
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
        if (this.baseQuestion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.baseQuestionService.update(this.baseQuestion));
        } else {
            this.subscribeToSaveResponse(
                this.baseQuestionService.create(this.baseQuestion));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BaseQuestionExam>>) {
        result.subscribe((res: HttpResponse<BaseQuestionExam>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BaseQuestionExam) {
        this.eventManager.broadcast({ name: 'baseQuestionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-base-question-exam-popup',
    template: ''
})
export class BaseQuestionExamPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private baseQuestionPopupService: BaseQuestionExamPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.baseQuestionPopupService
                    .open(BaseQuestionExamDialogComponent as Component, params['id']);
            } else {
                this.baseQuestionPopupService
                    .open(BaseQuestionExamDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
