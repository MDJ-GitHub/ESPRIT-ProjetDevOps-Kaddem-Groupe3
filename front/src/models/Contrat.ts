import { Etudiant } from '../models/Etudiant';

export class Contrat {
    idContrat?: number;
    montantContrat?: number;
    specialite?: Specialite;

    // Constructeur pour initialiser les propriétés
    constructor(
        idContrat?: number,
        montantContrat?: number,
        specialite?: Specialite
    ) {
        this.idContrat = idContrat;

        this.montantContrat = montantContrat;
        this.specialite = specialite;
    }
}

export enum Specialite {
    IA = 'IA',
    RESEAUX = 'RESEAUX',
    CLOUD = 'CLOUD',
}
