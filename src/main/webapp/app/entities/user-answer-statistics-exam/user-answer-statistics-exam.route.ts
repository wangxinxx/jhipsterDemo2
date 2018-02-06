import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { UserAnswerStatisticsExamComponent } from './user-answer-statistics-exam.component';
import { UserAnswerStatisticsExamDetailComponent } from './user-answer-statistics-exam-detail.component';
import { UserAnswerStatisticsExamPopupComponent } from './user-answer-statistics-exam-dialog.component';
import { UserAnswerStatisticsExamDeletePopupComponent } from './user-answer-statistics-exam-delete-dialog.component';

@Injectable()
export class UserAnswerStatisticsExamResolvePagingParams implements Resolve<any> {

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

export const userAnswerStatisticsRoute: Routes = [
    {
        path: 'user-answer-statistics-exam',
        component: UserAnswerStatisticsExamComponent,
        resolve: {
            'pagingParams': UserAnswerStatisticsExamResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserAnswerStatistics'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-answer-statistics-exam/:id',
        component: UserAnswerStatisticsExamDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserAnswerStatistics'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userAnswerStatisticsPopupRoute: Routes = [
    {
        path: 'user-answer-statistics-exam-new',
        component: UserAnswerStatisticsExamPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserAnswerStatistics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-answer-statistics-exam/:id/edit',
        component: UserAnswerStatisticsExamPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserAnswerStatistics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-answer-statistics-exam/:id/delete',
        component: UserAnswerStatisticsExamDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'UserAnswerStatistics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
