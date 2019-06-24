import { ICommande } from 'app/shared/model/commande.model';

export interface IPlat {
  id?: number;
  label?: string;
  commande?: ICommande;
}

export class Plat implements IPlat {
  constructor(public id?: number, public label?: string, public commande?: ICommande) {}
}
