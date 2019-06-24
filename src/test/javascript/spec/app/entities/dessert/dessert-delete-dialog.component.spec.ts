/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ResaRepas2TestModule } from '../../../test.module';
import { DessertDeleteDialogComponent } from 'app/entities/dessert/dessert-delete-dialog.component';
import { DessertService } from 'app/entities/dessert/dessert.service';

describe('Component Tests', () => {
  describe('Dessert Management Delete Component', () => {
    let comp: DessertDeleteDialogComponent;
    let fixture: ComponentFixture<DessertDeleteDialogComponent>;
    let service: DessertService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ResaRepas2TestModule],
        declarations: [DessertDeleteDialogComponent]
      })
        .overrideTemplate(DessertDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DessertDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DessertService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
