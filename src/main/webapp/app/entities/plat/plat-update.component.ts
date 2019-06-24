import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPlat, Plat } from 'app/shared/model/plat.model';
import { PlatService } from './plat.service';
import { ICommande } from 'app/shared/model/commande.model';
import { CommandeService } from 'app/entities/commande';

@Component({
  selector: 'jhi-plat-update',
  templateUrl: './plat-update.component.html'
})
export class PlatUpdateComponent implements OnInit {
  isSaving: boolean;

  commandes: ICommande[];

  editForm = this.fb.group({
    id: [],
    label: [],
    commande: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected platService: PlatService,
    protected commandeService: CommandeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ plat }) => {
      this.updateForm(plat);
    });
    this.commandeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICommande[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICommande[]>) => response.body)
      )
      .subscribe((res: ICommande[]) => (this.commandes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(plat: IPlat) {
    this.editForm.patchValue({
      id: plat.id,
      label: plat.label,
      commande: plat.commande
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const plat = this.createFromForm();
    if (plat.id !== undefined) {
      this.subscribeToSaveResponse(this.platService.update(plat));
    } else {
      this.subscribeToSaveResponse(this.platService.create(plat));
    }
  }

  private createFromForm(): IPlat {
    return {
      ...new Plat(),
      id: this.editForm.get(['id']).value,
      label: this.editForm.get(['label']).value,
      commande: this.editForm.get(['commande']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlat>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackCommandeById(index: number, item: ICommande) {
    return item.id;
  }
}
