/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ResaRepas2TestModule } from '../../../test.module';
import { PlatComponent } from 'app/entities/plat/plat.component';
import { PlatService } from 'app/entities/plat/plat.service';
import { Plat } from 'app/shared/model/plat.model';

describe('Component Tests', () => {
  describe('Plat Management Component', () => {
    let comp: PlatComponent;
    let fixture: ComponentFixture<PlatComponent>;
    let service: PlatService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ResaRepas2TestModule],
        declarations: [PlatComponent],
        providers: []
      })
        .overrideTemplate(PlatComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PlatComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PlatService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Plat(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.plats[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
