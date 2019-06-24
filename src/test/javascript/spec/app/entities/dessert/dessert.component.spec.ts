/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ResaRepas2TestModule } from '../../../test.module';
import { DessertComponent } from 'app/entities/dessert/dessert.component';
import { DessertService } from 'app/entities/dessert/dessert.service';
import { Dessert } from 'app/shared/model/dessert.model';

describe('Component Tests', () => {
  describe('Dessert Management Component', () => {
    let comp: DessertComponent;
    let fixture: ComponentFixture<DessertComponent>;
    let service: DessertService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ResaRepas2TestModule],
        declarations: [DessertComponent],
        providers: []
      })
        .overrideTemplate(DessertComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DessertComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DessertService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Dessert(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.desserts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
