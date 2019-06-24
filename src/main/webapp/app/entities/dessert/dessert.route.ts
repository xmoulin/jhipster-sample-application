import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Dessert } from 'app/shared/model/dessert.model';
import { DessertService } from './dessert.service';
import { DessertComponent } from './dessert.component';
import { DessertDetailComponent } from './dessert-detail.component';
import { DessertUpdateComponent } from './dessert-update.component';
import { DessertDeletePopupComponent } from './dessert-delete-dialog.component';
import { IDessert } from 'app/shared/model/dessert.model';

@Injectable({ providedIn: 'root' })
export class DessertResolve implements Resolve<IDessert> {
  constructor(private service: DessertService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDessert> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Dessert>) => response.ok),
        map((dessert: HttpResponse<Dessert>) => dessert.body)
      );
    }
    return of(new Dessert());
  }
}

export const dessertRoute: Routes = [
  {
    path: '',
    component: DessertComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Desserts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DessertDetailComponent,
    resolve: {
      dessert: DessertResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Desserts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DessertUpdateComponent,
    resolve: {
      dessert: DessertResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Desserts'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DessertUpdateComponent,
    resolve: {
      dessert: DessertResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Desserts'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const dessertPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DessertDeletePopupComponent,
    resolve: {
      dessert: DessertResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Desserts'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
