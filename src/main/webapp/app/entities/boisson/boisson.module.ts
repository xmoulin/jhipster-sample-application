import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ResaRepas2SharedModule } from 'app/shared';
import {
  BoissonComponent,
  BoissonDetailComponent,
  BoissonUpdateComponent,
  BoissonDeletePopupComponent,
  BoissonDeleteDialogComponent,
  boissonRoute,
  boissonPopupRoute
} from './';

const ENTITY_STATES = [...boissonRoute, ...boissonPopupRoute];

@NgModule({
  imports: [ResaRepas2SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    BoissonComponent,
    BoissonDetailComponent,
    BoissonUpdateComponent,
    BoissonDeleteDialogComponent,
    BoissonDeletePopupComponent
  ],
  entryComponents: [BoissonComponent, BoissonUpdateComponent, BoissonDeleteDialogComponent, BoissonDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResaRepas2BoissonModule {}
