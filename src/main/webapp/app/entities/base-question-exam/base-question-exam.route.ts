import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BaseQuestionExamComponent } from './base-question-exam.component';
import { BaseQuestionExamDetailComponent } from './base-question-exam-detail.component';
import { BaseQuestionExamPopupComponent } from './base-question-exam-dialog.component';
import { BaseQuestionExamDeletePopupComponent } from './base-question-exam-delete-dialog.component';

@Injectable()
export class BaseQuestionExamResolvePagingParams implements Resolve<any> {

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

export const baseQuestionRoute: Routes = [
    {
        path: 'base-question-exam',
        component: BaseQuestionExamComponent,
        resolve: {
            'pagingParams': BaseQuestionExamResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BaseQuestions'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'base-question-exam/:id',
        component: BaseQuestionExamDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BaseQuestions'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const baseQuestionPopupRoute: Routes = [
    {
        path: 'base-question-exam-new',
        component: BaseQuestionExamPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BaseQuestions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'base-question-exam/:id/edit',
        component: BaseQuestionExamPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BaseQuestions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'base-question-exam/:id/delete',
        component: BaseQuestionExamDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BaseQuestions'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
