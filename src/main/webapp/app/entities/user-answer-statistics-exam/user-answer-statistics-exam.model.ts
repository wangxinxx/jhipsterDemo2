import { BaseEntity } from './../../shared';

export class UserAnswerStatisticsExam implements BaseEntity {
    constructor(
        public id?: number,
        public userId?: number,
        public rightTimes?: number,
        public wrongTimes?: number,
        public continuousRightTimes?: number,
        public continuousWrongTimes?: number,
        public questionId?: number,
    ) {
    }
}
