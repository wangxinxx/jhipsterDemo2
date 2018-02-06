import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { UserAnswerExamComponent } from './user-answer-exam.component';
import { UserAnswerExamDetailComponent } from './user-answer-exam-detail.component';
import { UserAnswerExamPopupComponent } from './user-answer-exam-dialog.component';
import { UserAnswerExamDeletePopupComponent } from './user-answer-exam-delete-dialog.component';

@Injectable()
export class UserAnswerExamResolvePagingParams implements Resolve<any> {

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

export const userAnswerRoute: Routes = [
    {
        path: 'user-answer-exam',
        component: UserAnswerExamComponent,
        resolve: {
            'pagingParams': UserAnswerExamResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserAnswers'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-answer-exam/:id',
        component: UserAnswerExamDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserAnswers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userAnswerPopupRoute: Routes = [
    {
        path: 'user-answer-exam-new',
        component: UserAnswerExamPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserAnswers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-answer-exam/:id/edit',
        component: UserAnswerExamPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserAnswers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-answer-exam/:id/delete',
        component: UserAnswerExamDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserAnswers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
