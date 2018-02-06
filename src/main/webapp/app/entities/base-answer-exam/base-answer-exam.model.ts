import { BaseEntity } from './../../shared';

export class BaseAnswerExam implements BaseEntity {
    constructor(
        public id?: number,
        public content?: string,
        public result?: boolean,
        public questionId?: number,
    ) {
        this.result = false;
    }
}
