import { BaseEntity } from './../../shared';

export class UserAnswerExam implements BaseEntity {
    constructor(
        public id?: number,
        public userId?: number,
        public judgeAnswer?: boolean,
        public textAnswer?: any,
        public choiceAnswerIds?: string,
        public result?: boolean,
        public questionId?: number,
    ) {
        this.judgeAnswer = false;
        this.result = false;
    }
}
