import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ResaRepas2SharedModule } from 'app/shared';
import {
  CommandeComponent,
  CommandeDetailComponent,
  CommandeUpdateComponent,
  CommandeDeletePopupComponent,
  CommandeDeleteDialogComponent,
  commandeRoute,
  commandePopupRoute
} from './';

const ENTITY_STATES = [...commandeRoute, ...commandePopupRoute];

@NgModule({
  imports: [ResaRepas2SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CommandeComponent,
    CommandeDetailComponent,
    CommandeUpdateComponent,
    CommandeDeleteDialogComponent,
    CommandeDeletePopupComponent
  ],
  entryComponents: [CommandeComponent, CommandeUpdateComponent, CommandeDeleteDialogComponent, CommandeDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResaRepas2CommandeModule {}
