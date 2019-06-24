import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ResaRepas2SharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [ResaRepas2SharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [ResaRepas2SharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ResaRepas2SharedModule {
  static forRoot() {
    return {
      ngModule: ResaRepas2SharedModule
    };
  }
}
