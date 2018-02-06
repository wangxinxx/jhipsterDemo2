/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterDemo2TestModule } from '../../../test.module';
import { BaseAnswerExamDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/base-answer-exam/base-answer-exam-delete-dialog.component';
import { BaseAnswerExamService } from '../../../../../../main/webapp/app/entities/base-answer-exam/base-answer-exam.service';

describe('Component Tests', () => {

    describe('BaseAnswerExam Management Delete Component', () => {
        let comp: BaseAnswerExamDeleteDialogComponent;
        let fixture: ComponentFixture<BaseAnswerExamDeleteDialogComponent>;
        let service: BaseAnswerExamService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterDemo2TestModule],
                declarations: [BaseAnswerExamDeleteDialogComponent],
                providers: [
                    BaseAnswerExamService
                ]
            })
            .overrideTemplate(BaseAnswerExamDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BaseAnswerExamDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BaseAnswerExamService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
