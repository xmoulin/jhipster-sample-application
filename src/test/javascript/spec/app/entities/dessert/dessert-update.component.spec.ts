/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ResaRepas2TestModule } from '../../../test.module';
import { DessertUpdateComponent } from 'app/entities/dessert/dessert-update.component';
import { DessertService } from 'app/entities/dessert/dessert.service';
import { Dessert } from 'app/shared/model/dessert.model';

describe('Component Tests', () => {
  describe('Dessert Management Update Component', () => {
    let comp: DessertUpdateComponent;
    let fixture: ComponentFixture<DessertUpdateComponent>;
    let service: DessertService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ResaRepas2TestModule],
        declarations: [DessertUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DessertUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DessertUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DessertService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Dessert(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Dessert();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
