import { Equipe } from './Equipe';

export class Etudiant {
    idEtudiant: number;
    nomE: string;
    prenomE: string;
    equipes: Equipe[];

    constructor(
        idEtudiant: number,
        nomE: string,
        prenomE: string,
        equipes: Equipe[] = [],
    )
    {
        this.idEtudiant = idEtudiant;
        this.nomE = nomE;
        this.prenomE = prenomE;
        this.equipes = equipes;
    }
}
