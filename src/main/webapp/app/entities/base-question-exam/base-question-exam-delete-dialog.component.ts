import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BaseQuestionExam } from './base-question-exam.model';
import { BaseQuestionExamPopupService } from './base-question-exam-popup.service';
import { BaseQuestionExamService } from './base-question-exam.service';

@Component({
    selector: 'jhi-base-question-exam-delete-dialog',
    templateUrl: './base-question-exam-delete-dialog.component.html'
})
export class BaseQuestionExamDeleteDialogComponent {

    baseQuestion: BaseQuestionExam;

    constructor(
        private baseQuestionService: BaseQuestionExamService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.baseQuestionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'baseQuestionListModification',
                content: 'Deleted an baseQuestion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-base-question-exam-delete-popup',
    template: ''
})
export class BaseQuestionExamDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private baseQuestionPopupService: BaseQuestionExamPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.baseQuestionPopupService
                .open(BaseQuestionExamDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
