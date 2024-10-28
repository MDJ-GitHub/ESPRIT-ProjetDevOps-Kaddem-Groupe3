import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipe, Niveau } from 'src/models/Equipe';
import { Services } from 'src/services/EquipeService';

@Component({
  selector: 'app-equipe',
  templateUrl: './equipe.component.html',
  styleUrls: ['./equipe.component.css']
})
export class EquipeComponent {


  equipes: Equipe[] = [];
  addVisible: boolean = false;
  equipe = {
    nomEquipe: '',
    niveau: '',
    salle: null,
    thematique: '',
  };
  modify: boolean = false;
  modifyid: number = 0;
  newEquipe: Equipe = {}
  idDetailEquipem: number = 0;


  constructor(private services: Services) {
  }

  ngOnInit() {
    this.getEquipes()
  }


  getEquipes() {
    this.services.getEquipes().subscribe(
      (response) => {
        this.equipes = response
      },
      (error) => {
        alert('Error retrieving Equipes');
      }
    )
  }


  popupFreightId: number | undefined;
  popupPosition = { top: 0, left: 0 };
  togglePopup(event: MouseEvent, freightId: number | undefined) {
    event.stopPropagation();
    if (freightId !== 0) {
      this.popupFreightId = freightId;
      this.popupPosition = {
        top: event.clientY - 40,
        left: event.clientX - 275
      };
    } else {
      this.popupFreightId = 0;
    }
  }

  cancelPopup() {
    this.popupFreightId = 0;
  }

  toggleAddPopup() {
    this.addVisible = !this.addVisible;
  }

  modifyF(equipe: Equipe) {

    this.modify = true;
    this.modifyid = equipe.idEquipe as unknown as number;
    this.newEquipe.idEquipe = equipe.idEquipe
    this.idDetailEquipem = equipe.detailEquipe?.idDetailEquipe as unknown as number;

    if (equipe.nomEquipe !== null && equipe.nomEquipe !== undefined) {
      this.equipe.nomEquipe = equipe.nomEquipe as unknown as string;
    } else {
      this.equipe.nomEquipe = '';
    }

    if (equipe.niveau !== null && equipe.niveau !== undefined) {
      this.equipe.niveau = equipe.niveau as unknown as string
    } else {
      this.equipe.niveau = '';
    }

    if (equipe.detailEquipe?.salle !== null && equipe.detailEquipe?.salle !== undefined) {
      this.equipe.salle = equipe.detailEquipe.salle as unknown as number as unknown as null;
    } else {
      this.equipe.salle = null;
    }

    if (equipe.detailEquipe?.thematique !== null && equipe.detailEquipe?.thematique !== undefined) {
      this.equipe.thematique = equipe.detailEquipe.thematique as unknown as string;
    } else {
      this.equipe.thematique = '';
    }

    this.modify = true;
    this.toggleAddPopup()
    this.cancelPopup();

  }

  addEquipe() {

    this.newEquipe.nomEquipe = this.equipe.nomEquipe;
    this.newEquipe.niveau = this.equipe.niveau as Niveau;
    this.newEquipe.detailEquipe = {};
    this.newEquipe.detailEquipe.salle = this.equipe.salle as unknown as number;
    this.newEquipe.detailEquipe.thematique = this.equipe.thematique as unknown as string;

    if (this.modify == false) {
  
      this.services.addEquipe(this.newEquipe).subscribe(
        (response) => {
          window.location.reload();
        },
        (error) => {
          alert('Error adding Equipe');
        }
      )

    } else {

      this.newEquipe.detailEquipe.idDetailEquipe = this.idDetailEquipem as unknown as number;

      this.services.updateEquipe(this.newEquipe).subscribe(
        (response) => {
          this.modify = false;
          window.location.reload();
        },
        (error) => {
          alert('Error updating Equipe');
        }
      )
    }


  }

  removeEquipe(id: number | undefined) {
      this.services.removeEquipe(id as number).subscribe(
        (response) => {
          window.location.reload();
        },
        (error) => {
          alert('Error deleting Equipe');
        }
      )
    }


  

}
