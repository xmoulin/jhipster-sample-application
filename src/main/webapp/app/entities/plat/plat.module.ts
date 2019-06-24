import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ResaRepas2SharedModule } from 'app/shared';
import {
  PlatComponent,
  PlatDetailComponent,
  PlatUpdateComponent,
  PlatDeletePopupComponent,
  PlatDeleteDialogComponent,
  platRoute,
  platPopupRoute
} from './';

const ENTITY_STATES = [...platRoute, ...platPopupRoute];

@NgModule({
  imports: [ResaRepas2SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [PlatComponent, PlatDetailComponent, PlatUpdateComponent, PlatDeleteDialogComponent, PlatDeletePopupComponent],
  entryComponents: [PlatComponent, PlatUpdateComponent, PlatDeleteDialogComponent, PlatDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResaRepas2PlatModule {}
