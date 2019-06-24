import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDessert } from 'app/shared/model/dessert.model';

@Component({
  selector: 'jhi-dessert-detail',
  templateUrl: './dessert-detail.component.html'
})
export class DessertDetailComponent implements OnInit {
  dessert: IDessert;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dessert }) => {
      this.dessert = dessert;
    });
  }

  previousState() {
    window.history.back();
  }
}
