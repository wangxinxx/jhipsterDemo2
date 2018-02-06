import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { BaseQuestionExam } from './base-question-exam.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BaseQuestionExam>;

@Injectable()
export class BaseQuestionExamService {

    private resourceUrl =  SERVER_API_URL + 'api/base-questions';

    constructor(private http: HttpClient) { }

    create(baseQuestion: BaseQuestionExam): Observable<EntityResponseType> {
        const copy = this.convert(baseQuestion);
        return this.http.post<BaseQuestionExam>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(baseQuestion: BaseQuestionExam): Observable<EntityResponseType> {
        const copy = this.convert(baseQuestion);
        return this.http.put<BaseQuestionExam>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BaseQuestionExam>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BaseQuestionExam[]>> {
        const options = createRequestOption(req);
        return this.http.get<BaseQuestionExam[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BaseQuestionExam[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BaseQuestionExam = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BaseQuestionExam[]>): HttpResponse<BaseQuestionExam[]> {
        const jsonResponse: BaseQuestionExam[] = res.body;
        const body: BaseQuestionExam[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BaseQuestionExam.
     */
    private convertItemFromServer(baseQuestion: BaseQuestionExam): BaseQuestionExam {
        const copy: BaseQuestionExam = Object.assign({}, baseQuestion);
        return copy;
    }

    /**
     * Convert a BaseQuestionExam to a JSON which can be sent to the server.
     */
    private convert(baseQuestion: BaseQuestionExam): BaseQuestionExam {
        const copy: BaseQuestionExam = Object.assign({}, baseQuestion);
        return copy;
    }
}
