import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UserAnswerExam } from './user-answer-exam.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UserAnswerExam>;

@Injectable()
export class UserAnswerExamService {

    private resourceUrl =  SERVER_API_URL + 'api/user-answers';

    constructor(private http: HttpClient) { }

    create(userAnswer: UserAnswerExam): Observable<EntityResponseType> {
        const copy = this.convert(userAnswer);
        return this.http.post<UserAnswerExam>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(userAnswer: UserAnswerExam): Observable<EntityResponseType> {
        const copy = this.convert(userAnswer);
        return this.http.put<UserAnswerExam>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UserAnswerExam>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UserAnswerExam[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserAnswerExam[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UserAnswerExam[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UserAnswerExam = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UserAnswerExam[]>): HttpResponse<UserAnswerExam[]> {
        const jsonResponse: UserAnswerExam[] = res.body;
        const body: UserAnswerExam[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UserAnswerExam.
     */
    private convertItemFromServer(userAnswer: UserAnswerExam): UserAnswerExam {
        const copy: UserAnswerExam = Object.assign({}, userAnswer);
        return copy;
    }

    /**
     * Convert a UserAnswerExam to a JSON which can be sent to the server.
     */
    private convert(userAnswer: UserAnswerExam): UserAnswerExam {
        const copy: UserAnswerExam = Object.assign({}, userAnswer);
        return copy;
    }
}
