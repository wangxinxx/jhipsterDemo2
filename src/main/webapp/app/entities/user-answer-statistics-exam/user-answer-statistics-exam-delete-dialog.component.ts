import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UserAnswerStatisticsExam } from './user-answer-statistics-exam.model';
import { UserAnswerStatisticsExamPopupService } from './user-answer-statistics-exam-popup.service';
import { UserAnswerStatisticsExamService } from './user-answer-statistics-exam.service';

@Component({
    selector: 'jhi-user-answer-statistics-exam-delete-dialog',
    templateUrl: './user-answer-statistics-exam-delete-dialog.component.html'
})
export class UserAnswerStatisticsExamDeleteDialogComponent {

    userAnswerStatistics: UserAnswerStatisticsExam;

    constructor(
        private userAnswerStatisticsService: UserAnswerStatisticsExamService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.userAnswerStatisticsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'userAnswerStatisticsListModification',
                content: 'Deleted an userAnswerStatistics'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-user-answer-statistics-exam-delete-popup',
    template: ''
})
export class UserAnswerStatisticsExamDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private userAnswerStatisticsPopupService: UserAnswerStatisticsExamPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.userAnswerStatisticsPopupService
                .open(UserAnswerStatisticsExamDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
