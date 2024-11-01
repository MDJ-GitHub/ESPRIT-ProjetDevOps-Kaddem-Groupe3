import { Equipe } from "./equipes";

export enum Option {
    GAMIX = 'GAMIX',
    SE = 'SE',
    SIM = 'SIM',
    NIDS = 'NIDS'
  }
  
  export interface Etudiant {
    idEtudiant?:number | undefined;  
    nomE: string;
    prenomE: string;
    op?: Option; 
    contrats?: any[]; 
    departement?: any; 
    equipes?: Equipe[]; 
  }
  
