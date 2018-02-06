/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterDemo2TestModule } from '../../../test.module';
import { UserAnswerStatisticsExamDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/user-answer-statistics-exam/user-answer-statistics-exam-delete-dialog.component';
import { UserAnswerStatisticsExamService } from '../../../../../../main/webapp/app/entities/user-answer-statistics-exam/user-answer-statistics-exam.service';

describe('Component Tests', () => {

    describe('UserAnswerStatisticsExam Management Delete Component', () => {
        let comp: UserAnswerStatisticsExamDeleteDialogComponent;
        let fixture: ComponentFixture<UserAnswerStatisticsExamDeleteDialogComponent>;
        let service: UserAnswerStatisticsExamService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterDemo2TestModule],
                declarations: [UserAnswerStatisticsExamDeleteDialogComponent],
                providers: [
                    UserAnswerStatisticsExamService
                ]
            })
            .overrideTemplate(UserAnswerStatisticsExamDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserAnswerStatisticsExamDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserAnswerStatisticsExamService);
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
