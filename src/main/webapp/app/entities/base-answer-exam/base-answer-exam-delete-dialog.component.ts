import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BaseAnswerExam } from './base-answer-exam.model';
import { BaseAnswerExamPopupService } from './base-answer-exam-popup.service';
import { BaseAnswerExamService } from './base-answer-exam.service';

@Component({
    selector: 'jhi-base-answer-exam-delete-dialog',
    templateUrl: './base-answer-exam-delete-dialog.component.html'
})
export class BaseAnswerExamDeleteDialogComponent {

    baseAnswer: BaseAnswerExam;

    constructor(
        private baseAnswerService: BaseAnswerExamService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.baseAnswerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'baseAnswerListModification',
                content: 'Deleted an baseAnswer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-base-answer-exam-delete-popup',
    template: ''
})
export class BaseAnswerExamDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private baseAnswerPopupService: BaseAnswerExamPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.baseAnswerPopupService
                .open(BaseAnswerExamDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
