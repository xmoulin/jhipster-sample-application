import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDessert } from 'app/shared/model/dessert.model';
import { AccountService } from 'app/core';
import { DessertService } from './dessert.service';

@Component({
  selector: 'jhi-dessert',
  templateUrl: './dessert.component.html'
})
export class DessertComponent implements OnInit, OnDestroy {
  desserts: IDessert[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected dessertService: DessertService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.dessertService
      .query()
      .pipe(
        filter((res: HttpResponse<IDessert[]>) => res.ok),
        map((res: HttpResponse<IDessert[]>) => res.body)
      )
      .subscribe(
        (res: IDessert[]) => {
          this.desserts = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInDesserts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDessert) {
    return item.id;
  }

  registerChangeInDesserts() {
    this.eventSubscriber = this.eventManager.subscribe('dessertListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
