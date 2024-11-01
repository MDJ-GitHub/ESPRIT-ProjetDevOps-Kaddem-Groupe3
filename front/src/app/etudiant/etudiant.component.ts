import { Component, OnInit } from '@angular/core';
import { Etudiant } from 'src/models/etudiant';
import { EtudiantService } from 'src/services/etudiant.service';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.css']
})
export class EtudiantComponent implements OnInit {
  etudiants: Etudiant[] = [];
  etudiant: Etudiant = { nomE: '', prenomE: '' };
  selectedEtudiant: Etudiant | null = null;
  showAddForm = false;

  constructor(private etudiantService: EtudiantService) {}

  ngOnInit(): void {
    this.loadEtudiants();
  }

  loadEtudiants(): void {
    this.etudiantService.getEtudiants().subscribe(data => {
      this.etudiants = data;
    });
  }

  onSubmit(): void {
    if (this.selectedEtudiant) {
      this.etudiantService.updateEtudiant(this.etudiant).subscribe(() => {
        this.loadEtudiants();
        this.cancelEdit();
      });
    } else {
      this.etudiantService.addEtudiant(this.etudiant).subscribe(() => {
        this.loadEtudiants();
        this.etudiant = { nomE: '', prenomE: '' };
      });
    }
  }

  editEtudiant(etudiant: Etudiant): void {
    this.selectedEtudiant = etudiant;
    this.etudiant = { ...etudiant };
    this.showAddForm = true;
  }

  cancelEdit(): void {
    this.selectedEtudiant = null;
    this.etudiant = { nomE: '', prenomE: '' };
    this.showAddForm = false;
  }

  deleteEtudiant(idEtudiant: number | undefined): void {
    this.etudiantService.removeEtudiant(idEtudiant!).subscribe(() => {
      this.loadEtudiants();
    });
  }
}