/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterDemo2TestModule } from '../../../test.module';
import { UserAnswerExamDetailComponent } from '../../../../../../main/webapp/app/entities/user-answer-exam/user-answer-exam-detail.component';
import { UserAnswerExamService } from '../../../../../../main/webapp/app/entities/user-answer-exam/user-answer-exam.service';
import { UserAnswerExam } from '../../../../../../main/webapp/app/entities/user-answer-exam/user-answer-exam.model';

describe('Component Tests', () => {

    describe('UserAnswerExam Management Detail Component', () => {
        let comp: UserAnswerExamDetailComponent;
        let fixture: ComponentFixture<UserAnswerExamDetailComponent>;
        let service: UserAnswerExamService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterDemo2TestModule],
                declarations: [UserAnswerExamDetailComponent],
                providers: [
                    UserAnswerExamService
                ]
            })
            .overrideTemplate(UserAnswerExamDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserAnswerExamDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserAnswerExamService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UserAnswerExam(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.userAnswer).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
