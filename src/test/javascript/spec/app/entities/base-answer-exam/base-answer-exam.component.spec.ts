/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterDemo2TestModule } from '../../../test.module';
import { BaseAnswerExamComponent } from '../../../../../../main/webapp/app/entities/base-answer-exam/base-answer-exam.component';
import { BaseAnswerExamService } from '../../../../../../main/webapp/app/entities/base-answer-exam/base-answer-exam.service';
import { BaseAnswerExam } from '../../../../../../main/webapp/app/entities/base-answer-exam/base-answer-exam.model';

describe('Component Tests', () => {

    describe('BaseAnswerExam Management Component', () => {
        let comp: BaseAnswerExamComponent;
        let fixture: ComponentFixture<BaseAnswerExamComponent>;
        let service: BaseAnswerExamService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterDemo2TestModule],
                declarations: [BaseAnswerExamComponent],
                providers: [
                    BaseAnswerExamService
                ]
            })
            .overrideTemplate(BaseAnswerExamComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BaseAnswerExamComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BaseAnswerExamService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new BaseAnswerExam(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.baseAnswers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
