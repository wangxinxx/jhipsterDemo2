import { BaseEntity } from './../../shared';

export const enum QuestionType {
    'MULTIPLE_CHOICE',
    'MORE_MULTIPLE_CHOICE',
    'TRUE_FALSE',
    'FILL_BLANK',
    'SHORT_ANSWER',
    'ESSAY_QUESTIONS'
}

export const enum QuestionDifficult {
    'SO_EASY',
    'EASY',
    'NORMAL',
    'HARD',
    'VERY_HARD'
}

export class BaseQuestionExam implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public content?: any,
        public type?: QuestionType,
        public difficult?: QuestionDifficult,
        public courseId?: number,
        public exposeTimes?: number,
        public rightTimes?: number,
        public wrongTimes?: number,
        public tips?: string,
        public tags?: string,
        public judgeResult?: boolean,
        public textResult?: any,
        public answers?: BaseEntity[],
    ) {
        this.judgeResult = false;
    }
}
