import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDessert } from 'app/shared/model/dessert.model';

type EntityResponseType = HttpResponse<IDessert>;
type EntityArrayResponseType = HttpResponse<IDessert[]>;

@Injectable({ providedIn: 'root' })
export class DessertService {
  public resourceUrl = SERVER_API_URL + 'api/desserts';

  constructor(protected http: HttpClient) {}

  create(dessert: IDessert): Observable<EntityResponseType> {
    return this.http.post<IDessert>(this.resourceUrl, dessert, { observe: 'response' });
  }

  update(dessert: IDessert): Observable<EntityResponseType> {
    return this.http.put<IDessert>(this.resourceUrl, dessert, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDessert>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDessert[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
