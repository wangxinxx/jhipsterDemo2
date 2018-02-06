/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterDemo2TestModule } from '../../../test.module';
import { BaseQuestionExamDetailComponent } from '../../../../../../main/webapp/app/entities/base-question-exam/base-question-exam-detail.component';
import { BaseQuestionExamService } from '../../../../../../main/webapp/app/entities/base-question-exam/base-question-exam.service';
import { BaseQuestionExam } from '../../../../../../main/webapp/app/entities/base-question-exam/base-question-exam.model';

describe('Component Tests', () => {

    describe('BaseQuestionExam Management Detail Component', () => {
        let comp: BaseQuestionExamDetailComponent;
        let fixture: ComponentFixture<BaseQuestionExamDetailComponent>;
        let service: BaseQuestionExamService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterDemo2TestModule],
                declarations: [BaseQuestionExamDetailComponent],
                providers: [
                    BaseQuestionExamService
                ]
            })
            .overrideTemplate(BaseQuestionExamDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BaseQuestionExamDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BaseQuestionExamService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BaseQuestionExam(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.baseQuestion).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
