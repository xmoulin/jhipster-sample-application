import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IBoisson } from 'app/shared/model/boisson.model';
import { AccountService } from 'app/core';
import { BoissonService } from './boisson.service';

@Component({
  selector: 'jhi-boisson',
  templateUrl: './boisson.component.html'
})
export class BoissonComponent implements OnInit, OnDestroy {
  boissons: IBoisson[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected boissonService: BoissonService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.boissonService
      .query()
      .pipe(
        filter((res: HttpResponse<IBoisson[]>) => res.ok),
        map((res: HttpResponse<IBoisson[]>) => res.body)
      )
      .subscribe(
        (res: IBoisson[]) => {
          this.boissons = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInBoissons();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBoisson) {
    return item.id;
  }

  registerChangeInBoissons() {
    this.eventSubscriber = this.eventManager.subscribe('boissonListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
