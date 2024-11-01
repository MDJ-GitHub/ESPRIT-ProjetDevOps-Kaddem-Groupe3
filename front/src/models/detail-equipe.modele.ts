import { Equipe } from "./equipes";

export interface DetailEquipe {
  idDetailEquipe?: number; // Optional for new entities
  salle: number; // Room number
  thematique: string; // Thematic subject
  equipe?: Equipe; // Reference to Equipe model if applicable
}
