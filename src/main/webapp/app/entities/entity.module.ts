import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'plat',
        loadChildren: './plat/plat.module#ResaRepas2PlatModule'
      },
      {
        path: 'dessert',
        loadChildren: './dessert/dessert.module#ResaRepas2DessertModule'
      },
      {
        path: 'boisson',
        loadChildren: './boisson/boisson.module#ResaRepas2BoissonModule'
      },
      {
        path: 'commande',
        loadChildren: './commande/commande.module#ResaRepas2CommandeModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResaRepas2EntityModule {}
