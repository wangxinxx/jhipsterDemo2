import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { BaseQuestionExam } from './base-question-exam.model';
import { BaseQuestionExamService } from './base-question-exam.service';
import {ActivatedRoute} from '@angular/router/src/router_state';

@Injectable()
export class BaseQuestionExamPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private baseQuestionService: BaseQuestionExamService

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
                this.baseQuestionService.find(id)
                    .subscribe((baseQuestionResponse: HttpResponse<BaseQuestionExam>) => {
                        const baseQuestion: BaseQuestionExam = baseQuestionResponse.body;
                        this.ngbModalRef = this.baseQuestionModalRef(component, baseQuestion);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.baseQuestionModalRef(component, new BaseQuestionExam());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    baseQuestionModalRef(component: Component, baseQuestion: BaseQuestionExam): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.baseQuestion = baseQuestion;
        modalRef.result.then((result) => {
            this.router.navigate(['/admin/question', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate(['/admin/question', { outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge'});
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
