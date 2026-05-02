export interface Transaction {
  id: number;
  auteur: string;
  description: string;
  montant: number;
  date: Date;
  categorie: string;
  confirme: boolean;
}

export interface Vote {
  id: number;
  description: string;
  montant: number;
  votesPour: number;
  votesContre: number;
  dateLimite: Date;
  actif: boolean;
  execute: boolean;
}
