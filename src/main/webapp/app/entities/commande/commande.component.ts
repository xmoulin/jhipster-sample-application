import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICommande } from 'app/shared/model/commande.model';
import { AccountService } from 'app/core';
import { CommandeService } from './commande.service';

@Component({
  selector: 'jhi-commande',
  templateUrl: './commande.component.html'
})
export class CommandeComponent implements OnInit, OnDestroy {
  commandes: ICommande[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected commandeService: CommandeService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.commandeService
      .query()
      .pipe(
        filter((res: HttpResponse<ICommande[]>) => res.ok),
        map((res: HttpResponse<ICommande[]>) => res.body)
      )
      .subscribe(
        (res: ICommande[]) => {
          this.commandes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCommandes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICommande) {
    return item.id;
  }

  registerChangeInCommandes() {
    this.eventSubscriber = this.eventManager.subscribe('commandeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
