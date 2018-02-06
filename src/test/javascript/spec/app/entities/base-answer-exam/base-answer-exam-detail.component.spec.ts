/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterDemo2TestModule } from '../../../test.module';
import { BaseAnswerExamDetailComponent } from '../../../../../../main/webapp/app/entities/base-answer-exam/base-answer-exam-detail.component';
import { BaseAnswerExamService } from '../../../../../../main/webapp/app/entities/base-answer-exam/base-answer-exam.service';
import { BaseAnswerExam } from '../../../../../../main/webapp/app/entities/base-answer-exam/base-answer-exam.model';

describe('Component Tests', () => {

    describe('BaseAnswerExam Management Detail Component', () => {
        let comp: BaseAnswerExamDetailComponent;
        let fixture: ComponentFixture<BaseAnswerExamDetailComponent>;
        let service: BaseAnswerExamService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterDemo2TestModule],
                declarations: [BaseAnswerExamDetailComponent],
                providers: [
                    BaseAnswerExamService
                ]
            })
            .overrideTemplate(BaseAnswerExamDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BaseAnswerExamDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BaseAnswerExamService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BaseAnswerExam(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.baseAnswer).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
