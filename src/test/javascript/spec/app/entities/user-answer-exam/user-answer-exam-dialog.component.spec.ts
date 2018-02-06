/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterDemo2TestModule } from '../../../test.module';
import { UserAnswerExamDialogComponent } from '../../../../../../main/webapp/app/entities/user-answer-exam/user-answer-exam-dialog.component';
import { UserAnswerExamService } from '../../../../../../main/webapp/app/entities/user-answer-exam/user-answer-exam.service';
import { UserAnswerExam } from '../../../../../../main/webapp/app/entities/user-answer-exam/user-answer-exam.model';
import { BaseQuestionExamService } from '../../../../../../main/webapp/app/entities/base-question-exam';

describe('Component Tests', () => {

    describe('UserAnswerExam Management Dialog Component', () => {
        let comp: UserAnswerExamDialogComponent;
        let fixture: ComponentFixture<UserAnswerExamDialogComponent>;
        let service: UserAnswerExamService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterDemo2TestModule],
                declarations: [UserAnswerExamDialogComponent],
                providers: [
                    BaseQuestionExamService,
                    UserAnswerExamService
                ]
            })
            .overrideTemplate(UserAnswerExamDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserAnswerExamDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserAnswerExamService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UserAnswerExam(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.userAnswer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'userAnswerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UserAnswerExam();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.userAnswer = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'userAnswerListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
