import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BaseAnswerExamComponent } from './base-answer-exam.component';
import { BaseAnswerExamDetailComponent } from './base-answer-exam-detail.component';
import { BaseAnswerExamPopupComponent } from './base-answer-exam-dialog.component';
import { BaseAnswerExamDeletePopupComponent } from './base-answer-exam-delete-dialog.component';

@Injectable()
export class BaseAnswerExamResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const baseAnswerRoute: Routes = [
    {
        path: 'base-answer-exam',
        component: BaseAnswerExamComponent,
        resolve: {
            'pagingParams': BaseAnswerExamResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BaseAnswers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'base-answer-exam/:id',
        component: BaseAnswerExamDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BaseAnswers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const baseAnswerPopupRoute: Routes = [
    {
        path: 'base-answer-exam-new',
        component: BaseAnswerExamPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BaseAnswers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'base-answer-exam/:id/edit',
        component: BaseAnswerExamPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BaseAnswers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'base-answer-exam/:id/delete',
        component: BaseAnswerExamDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BaseAnswers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
