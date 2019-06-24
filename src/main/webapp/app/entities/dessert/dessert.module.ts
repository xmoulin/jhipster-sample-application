import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ResaRepas2SharedModule } from 'app/shared';
import {
  DessertComponent,
  DessertDetailComponent,
  DessertUpdateComponent,
  DessertDeletePopupComponent,
  DessertDeleteDialogComponent,
  dessertRoute,
  dessertPopupRoute
} from './';

const ENTITY_STATES = [...dessertRoute, ...dessertPopupRoute];

@NgModule({
  imports: [ResaRepas2SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DessertComponent,
    DessertDetailComponent,
    DessertUpdateComponent,
    DessertDeleteDialogComponent,
    DessertDeletePopupComponent
  ],
  entryComponents: [DessertComponent, DessertUpdateComponent, DessertDeleteDialogComponent, DessertDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResaRepas2DessertModule {}
