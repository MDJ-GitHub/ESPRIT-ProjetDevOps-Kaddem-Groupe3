import { DetailEquipe } from '../models/DetailEquipe'; 
import { Etudiant } from '../models/Etudiant'; 

export class Equipe {
    idEquipe?: number; 
    nomEquipe?: string; 
    niveau?: Niveau; 
    etudiants?: Etudiant[];
    detailEquipe?: DetailEquipe;


}

export enum Niveau {
    JUNIOR = 'Junior',
    SENIOR = 'Senior',
    EXPERT = 'Expert',
  }