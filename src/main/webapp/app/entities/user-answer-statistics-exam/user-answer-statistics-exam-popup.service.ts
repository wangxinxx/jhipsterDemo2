import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { UserAnswerStatisticsExam } from './user-answer-statistics-exam.model';
import { UserAnswerStatisticsExamService } from './user-answer-statistics-exam.service';

@Injectable()
export class UserAnswerStatisticsExamPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private userAnswerStatisticsService: UserAnswerStatisticsExamService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.userAnswerStatisticsService.find(id)
                    .subscribe((userAnswerStatisticsResponse: HttpResponse<UserAnswerStatisticsExam>) => {
                        const userAnswerStatistics: UserAnswerStatisticsExam = userAnswerStatisticsResponse.body;
                        this.ngbModalRef = this.userAnswerStatisticsModalRef(component, userAnswerStatistics);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.userAnswerStatisticsModalRef(component, new UserAnswerStatisticsExam());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    userAnswerStatisticsModalRef(component: Component, userAnswerStatistics: UserAnswerStatisticsExam): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.userAnswerStatistics = userAnswerStatistics;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
