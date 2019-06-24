import { ICommande } from 'app/shared/model/commande.model';

export interface IDessert {
  id?: number;
  label?: string;
  commande?: ICommande;
}

export class Dessert implements IDessert {
  constructor(public id?: number, public label?: string, public commande?: ICommande) {}
}
