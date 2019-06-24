import { NgModule } from '@angular/core';

import { ResaRepas2SharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [ResaRepas2SharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [ResaRepas2SharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class ResaRepas2SharedCommonModule {}
