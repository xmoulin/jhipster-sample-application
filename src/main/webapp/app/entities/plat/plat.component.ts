import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IPlat } from 'app/shared/model/plat.model';
import { AccountService } from 'app/core';
import { PlatService } from './plat.service';

@Component({
  selector: 'jhi-plat',
  templateUrl: './plat.component.html'
})
export class PlatComponent implements OnInit, OnDestroy {
  plats: IPlat[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected platService: PlatService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.platService
      .query()
      .pipe(
        filter((res: HttpResponse<IPlat[]>) => res.ok),
        map((res: HttpResponse<IPlat[]>) => res.body)
      )
      .subscribe(
        (res: IPlat[]) => {
          this.plats = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPlats();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPlat) {
    return item.id;
  }

  registerChangeInPlats() {
    this.eventSubscriber = this.eventManager.subscribe('platListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
