import { DetailEquipe } from './detail-equipe.modele';
import { Etudiant } from './etudiant';
import { Niveau } from './niveau';


export interface Equipe {
  idEquipe?: number; // Optional for new entities
  nomEquipe: string;
  niveau: Niveau; // Enum type for Niveau
  etudiants?: Etudiant[]; // Reference to Etudiant model
  detailEquipe?: DetailEquipe; // Reference to DetailEquipe model if defined
}
