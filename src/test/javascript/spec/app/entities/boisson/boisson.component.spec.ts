/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ResaRepas2TestModule } from '../../../test.module';
import { BoissonComponent } from 'app/entities/boisson/boisson.component';
import { BoissonService } from 'app/entities/boisson/boisson.service';
import { Boisson } from 'app/shared/model/boisson.model';

describe('Component Tests', () => {
  describe('Boisson Management Component', () => {
    let comp: BoissonComponent;
    let fixture: ComponentFixture<BoissonComponent>;
    let service: BoissonService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ResaRepas2TestModule],
        declarations: [BoissonComponent],
        providers: []
      })
        .overrideTemplate(BoissonComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(BoissonComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(BoissonService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Boisson(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.boissons[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
