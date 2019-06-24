import { IPlat } from 'app/shared/model/plat.model';
import { IBoisson } from 'app/shared/model/boisson.model';
import { IDessert } from 'app/shared/model/dessert.model';

export interface ICommande {
  id?: number;
  name?: string;
  employees?: IPlat[];
  employees?: IBoisson[];
  employees?: IDessert[];
}

export class Commande implements ICommande {
  constructor(
    public id?: number,
    public name?: string,
    public employees?: IPlat[],
    public employees?: IBoisson[],
    public employees?: IDessert[]
  ) {}
}
