export interface ICommande {
  id?: number;
  plat?: string;
  dessert?: string;
  boisson?: string;
}

export class Commande implements ICommande {
  constructor(public id?: number, public plat?: string, public dessert?: string, public boisson?: string) {}
}
