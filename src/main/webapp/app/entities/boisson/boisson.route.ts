import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Boisson } from 'app/shared/model/boisson.model';
import { BoissonService } from './boisson.service';
import { BoissonComponent } from './boisson.component';
import { BoissonDetailComponent } from './boisson-detail.component';
import { BoissonUpdateComponent } from './boisson-update.component';
import { BoissonDeletePopupComponent } from './boisson-delete-dialog.component';
import { IBoisson } from 'app/shared/model/boisson.model';

@Injectable({ providedIn: 'root' })
export class BoissonResolve implements Resolve<IBoisson> {
  constructor(private service: BoissonService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IBoisson> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Boisson>) => response.ok),
        map((boisson: HttpResponse<Boisson>) => boisson.body)
      );
    }
    return of(new Boisson());
  }
}

export const boissonRoute: Routes = [
  {
    path: '',
    component: BoissonComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Boissons'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BoissonDetailComponent,
    resolve: {
      boisson: BoissonResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Boissons'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BoissonUpdateComponent,
    resolve: {
      boisson: BoissonResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Boissons'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BoissonUpdateComponent,
    resolve: {
      boisson: BoissonResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Boissons'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const boissonPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: BoissonDeletePopupComponent,
    resolve: {
      boisson: BoissonResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Boissons'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
