/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterDemo2TestModule } from '../../../test.module';
import { BaseQuestionExamComponent } from '../../../../../../main/webapp/app/entities/base-question-exam/base-question-exam.component';
import { BaseQuestionExamService } from '../../../../../../main/webapp/app/entities/base-question-exam/base-question-exam.service';
import { BaseQuestionExam } from '../../../../../../main/webapp/app/entities/base-question-exam/base-question-exam.model';

describe('Component Tests', () => {

    describe('BaseQuestionExam Management Component', () => {
        let comp: BaseQuestionExamComponent;
        let fixture: ComponentFixture<BaseQuestionExamComponent>;
        let service: BaseQuestionExamService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterDemo2TestModule],
                declarations: [BaseQuestionExamComponent],
                providers: [
                    BaseQuestionExamService
                ]
            })
            .overrideTemplate(BaseQuestionExamComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BaseQuestionExamComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BaseQuestionExamService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BaseQuestionExam(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.baseQuestions[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
