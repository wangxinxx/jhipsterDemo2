import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserAnswerExam } from './user-answer-exam.model';
import { UserAnswerExamPopupService } from './user-answer-exam-popup.service';
import { UserAnswerExamService } from './user-answer-exam.service';

@Component({
    selector: 'jhi-user-answer-exam-delete-dialog',
    templateUrl: './user-answer-exam-delete-dialog.component.html'
})
export class UserAnswerExamDeleteDialogComponent {

    userAnswer: UserAnswerExam;

    constructor(
        private userAnswerService: UserAnswerExamService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userAnswerService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userAnswerListModification',
                content: 'Deleted an userAnswer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-answer-exam-delete-popup',
    template: ''
})
export class UserAnswerExamDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userAnswerPopupService: UserAnswerExamPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userAnswerPopupService
                .open(UserAnswerExamDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
