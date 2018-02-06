/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterDemo2TestModule } from '../../../test.module';
import { UserAnswerStatisticsExamDetailComponent } from '../../../../../../main/webapp/app/entities/user-answer-statistics-exam/user-answer-statistics-exam-detail.component';
import { UserAnswerStatisticsExamService } from '../../../../../../main/webapp/app/entities/user-answer-statistics-exam/user-answer-statistics-exam.service';
import { UserAnswerStatisticsExam } from '../../../../../../main/webapp/app/entities/user-answer-statistics-exam/user-answer-statistics-exam.model';

describe('Component Tests', () => {

    describe('UserAnswerStatisticsExam Management Detail Component', () => {
        let comp: UserAnswerStatisticsExamDetailComponent;
        let fixture: ComponentFixture<UserAnswerStatisticsExamDetailComponent>;
        let service: UserAnswerStatisticsExamService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterDemo2TestModule],
                declarations: [UserAnswerStatisticsExamDetailComponent],
                providers: [
                    UserAnswerStatisticsExamService
                ]
            })
            .overrideTemplate(UserAnswerStatisticsExamDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserAnswerStatisticsExamDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserAnswerStatisticsExamService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UserAnswerStatisticsExam(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.userAnswerStatistics).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
