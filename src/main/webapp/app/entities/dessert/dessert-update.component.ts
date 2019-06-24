import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDessert, Dessert } from 'app/shared/model/dessert.model';
import { DessertService } from './dessert.service';
import { ICommande } from 'app/shared/model/commande.model';
import { CommandeService } from 'app/entities/commande';

@Component({
  selector: 'jhi-dessert-update',
  templateUrl: './dessert-update.component.html'
})
export class DessertUpdateComponent implements OnInit {
  isSaving: boolean;

  commandes: ICommande[];

  editForm = this.fb.group({
    id: [],
    label: [],
    commande: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected dessertService: DessertService,
    protected commandeService: CommandeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ dessert }) => {
      this.updateForm(dessert);
    });
    this.commandeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICommande[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICommande[]>) => response.body)
      )
      .subscribe((res: ICommande[]) => (this.commandes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(dessert: IDessert) {
    this.editForm.patchValue({
      id: dessert.id,
      label: dessert.label,
      commande: dessert.commande
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const dessert = this.createFromForm();
    if (dessert.id !== undefined) {
      this.subscribeToSaveResponse(this.dessertService.update(dessert));
    } else {
      this.subscribeToSaveResponse(this.dessertService.create(dessert));
    }
  }

  private createFromForm(): IDessert {
    return {
      ...new Dessert(),
      id: this.editForm.get(['id']).value,
      label: this.editForm.get(['label']).value,
      commande: this.editForm.get(['commande']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDessert>>) {
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
