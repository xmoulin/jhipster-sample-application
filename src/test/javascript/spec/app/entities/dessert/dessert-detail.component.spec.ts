/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ResaRepas2TestModule } from '../../../test.module';
import { DessertDetailComponent } from 'app/entities/dessert/dessert-detail.component';
import { Dessert } from 'app/shared/model/dessert.model';

describe('Component Tests', () => {
  describe('Dessert Management Detail Component', () => {
    let comp: DessertDetailComponent;
    let fixture: ComponentFixture<DessertDetailComponent>;
    const route = ({ data: of({ dessert: new Dessert(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ResaRepas2TestModule],
        declarations: [DessertDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DessertDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DessertDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.dessert).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
