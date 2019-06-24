import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IBoisson } from 'app/shared/model/boisson.model';

@Component({
  selector: 'jhi-boisson-detail',
  templateUrl: './boisson-detail.component.html'
})
export class BoissonDetailComponent implements OnInit {
  boisson: IBoisson;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ boisson }) => {
      this.boisson = boisson;
    });
  }

  previousState() {
    window.history.back();
  }
}
