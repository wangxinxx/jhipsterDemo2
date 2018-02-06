import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { BaseAnswerExam } from './base-answer-exam.model';
import { BaseAnswerExamService } from './base-answer-exam.service';

@Injectable()
export class BaseAnswerExamPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private baseAnswerService: BaseAnswerExamService

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
                this.baseAnswerService.find(id)
                    .subscribe((baseAnswerResponse: HttpResponse<BaseAnswerExam>) => {
                        const baseAnswer: BaseAnswerExam = baseAnswerResponse.body;
                        this.ngbModalRef = this.baseAnswerModalRef(component, baseAnswer);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.baseAnswerModalRef(component, new BaseAnswerExam());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    baseAnswerModalRef(component: Component, baseAnswer: BaseAnswerExam): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.baseAnswer = baseAnswer;
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
