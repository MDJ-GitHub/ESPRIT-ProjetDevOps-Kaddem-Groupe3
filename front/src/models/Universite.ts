import { Departement } from "./Departement";


export class Universite {
  idUniv?: number;
  nomUniv?: string;
  departements?: Departement[];

  constructor(idUniv?: number, nomUniv?: string, departements?: Departement[]) {
    this.idUniv = idUniv;
    this.nomUniv = nomUniv;
    this.departements = departements;
  }
}

