/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterDemo2TestModule } from '../../../test.module';
import { BaseAnswerExamDialogComponent } from '../../../../../../main/webapp/app/entities/base-answer-exam/base-answer-exam-dialog.component';
import { BaseAnswerExamService } from '../../../../../../main/webapp/app/entities/base-answer-exam/base-answer-exam.service';
import { BaseAnswerExam } from '../../../../../../main/webapp/app/entities/base-answer-exam/base-answer-exam.model';
import { BaseQuestionExamService } from '../../../../../../main/webapp/app/entities/base-question-exam';

describe('Component Tests', () => {

    describe('BaseAnswerExam Management Dialog Component', () => {
        let comp: BaseAnswerExamDialogComponent;
        let fixture: ComponentFixture<BaseAnswerExamDialogComponent>;
        let service: BaseAnswerExamService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterDemo2TestModule],
                declarations: [BaseAnswerExamDialogComponent],
                providers: [
                    BaseQuestionExamService,
                    BaseAnswerExamService
                ]
            })
            .overrideTemplate(BaseAnswerExamDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BaseAnswerExamDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BaseAnswerExamService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BaseAnswerExam(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.baseAnswer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'baseAnswerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new BaseAnswerExam();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.baseAnswer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'baseAnswerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
