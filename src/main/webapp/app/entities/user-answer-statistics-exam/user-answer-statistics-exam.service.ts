import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UserAnswerStatisticsExam } from './user-answer-statistics-exam.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UserAnswerStatisticsExam>;

@Injectable()
export class UserAnswerStatisticsExamService {

    private resourceUrl =  SERVER_API_URL + 'api/user-answer-statistics';

    constructor(private http: HttpClient) { }

    create(userAnswerStatistics: UserAnswerStatisticsExam): Observable<EntityResponseType> {
        const copy = this.convert(userAnswerStatistics);
        return this.http.post<UserAnswerStatisticsExam>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(userAnswerStatistics: UserAnswerStatisticsExam): Observable<EntityResponseType> {
        const copy = this.convert(userAnswerStatistics);
        return this.http.put<UserAnswerStatisticsExam>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UserAnswerStatisticsExam>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UserAnswerStatisticsExam[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserAnswerStatisticsExam[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UserAnswerStatisticsExam[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UserAnswerStatisticsExam = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UserAnswerStatisticsExam[]>): HttpResponse<UserAnswerStatisticsExam[]> {
        const jsonResponse: UserAnswerStatisticsExam[] = res.body;
        const body: UserAnswerStatisticsExam[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UserAnswerStatisticsExam.
     */
    private convertItemFromServer(userAnswerStatistics: UserAnswerStatisticsExam): UserAnswerStatisticsExam {
        const copy: UserAnswerStatisticsExam = Object.assign({}, userAnswerStatistics);
        return copy;
    }

    /**
     * Convert a UserAnswerStatisticsExam to a JSON which can be sent to the server.
     */
    private convert(userAnswerStatistics: UserAnswerStatisticsExam): UserAnswerStatisticsExam {
        const copy: UserAnswerStatisticsExam = Object.assign({}, userAnswerStatistics);
        return copy;
    }
}
