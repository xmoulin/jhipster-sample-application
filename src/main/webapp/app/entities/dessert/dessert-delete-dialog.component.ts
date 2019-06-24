import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDessert } from 'app/shared/model/dessert.model';
import { DessertService } from './dessert.service';

@Component({
  selector: 'jhi-dessert-delete-dialog',
  templateUrl: './dessert-delete-dialog.component.html'
})
export class DessertDeleteDialogComponent {
  dessert: IDessert;

  constructor(protected dessertService: DessertService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.dessertService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'dessertListModification',
        content: 'Deleted an dessert'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-dessert-delete-popup',
  template: ''
})
export class DessertDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dessert }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DessertDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.dessert = dessert;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/dessert', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/dessert', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
