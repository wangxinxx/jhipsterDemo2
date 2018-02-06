import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { BaseAnswerExam } from './base-answer-exam.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BaseAnswerExam>;

@Injectable()
export class BaseAnswerExamService {

    private resourceUrl =  SERVER_API_URL + 'api/base-answers';

    constructor(private http: HttpClient) { }

    create(baseAnswer: BaseAnswerExam): Observable<EntityResponseType> {
        const copy = this.convert(baseAnswer);
        return this.http.post<BaseAnswerExam>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(baseAnswer: BaseAnswerExam): Observable<EntityResponseType> {
        const copy = this.convert(baseAnswer);
        return this.http.put<BaseAnswerExam>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BaseAnswerExam>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BaseAnswerExam[]>> {
        const options = createRequestOption(req);
        return this.http.get<BaseAnswerExam[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BaseAnswerExam[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BaseAnswerExam = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BaseAnswerExam[]>): HttpResponse<BaseAnswerExam[]> {
        const jsonResponse: BaseAnswerExam[] = res.body;
        const body: BaseAnswerExam[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BaseAnswerExam.
     */
    private convertItemFromServer(baseAnswer: BaseAnswerExam): BaseAnswerExam {
        const copy: BaseAnswerExam = Object.assign({}, baseAnswer);
        return copy;
    }

    /**
     * Convert a BaseAnswerExam to a JSON which can be sent to the server.
     */
    private convert(baseAnswer: BaseAnswerExam): BaseAnswerExam {
        const copy: BaseAnswerExam = Object.assign({}, baseAnswer);
        return copy;
    }
}
