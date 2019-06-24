import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IBoisson, Boisson } from 'app/shared/model/boisson.model';
import { BoissonService } from './boisson.service';
import { ICommande } from 'app/shared/model/commande.model';
import { CommandeService } from 'app/entities/commande';

@Component({
  selector: 'jhi-boisson-update',
  templateUrl: './boisson-update.component.html'
})
export class BoissonUpdateComponent implements OnInit {
  isSaving: boolean;

  commandes: ICommande[];

  editForm = this.fb.group({
    id: [],
    label: [],
    commande: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected boissonService: BoissonService,
    protected commandeService: CommandeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ boisson }) => {
      this.updateForm(boisson);
    });
    this.commandeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICommande[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICommande[]>) => response.body)
      )
      .subscribe((res: ICommande[]) => (this.commandes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(boisson: IBoisson) {
    this.editForm.patchValue({
      id: boisson.id,
      label: boisson.label,
      commande: boisson.commande
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const boisson = this.createFromForm();
    if (boisson.id !== undefined) {
      this.subscribeToSaveResponse(this.boissonService.update(boisson));
    } else {
      this.subscribeToSaveResponse(this.boissonService.create(boisson));
    }
  }

  private createFromForm(): IBoisson {
    return {
      ...new Boisson(),
      id: this.editForm.get(['id']).value,
      label: this.editForm.get(['label']).value,
      commande: this.editForm.get(['commande']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBoisson>>) {
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
