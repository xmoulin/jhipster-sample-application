import { ICommande } from 'app/shared/model/commande.model';

export interface IBoisson {
  id?: number;
  label?: string;
  commande?: ICommande;
}

export class Boisson implements IBoisson {
  constructor(public id?: number, public label?: string, public commande?: ICommande) {}
}
