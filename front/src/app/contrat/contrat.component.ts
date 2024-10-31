import { Component, OnInit } from '@angular/core';
import { Services } from 'src/services/ContratService';
import { Contrat, Specialite } from 'src/models/Contrat';

@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.css']
})
export class ContratComponent implements OnInit {
  contrats: Contrat[] = [];
  addVisible: boolean = false;
  modify: boolean = false;
  selectedContrat: Contrat = new Contrat();
  popupFreightId: number | undefined;

  constructor(private services: Services) {}

  ngOnInit() {
    this.getContrats();
  }

  getContrats() {
    this.services.getContrat().subscribe(
      (response) => {
        this.contrats = response;
      },
      (error) => {
        alert('Error retrieving contrats');
      }
    );
  }

  toggleAddPopup() {
    this.addVisible = !this.addVisible;
    if (this.addVisible) {
      this.selectedContrat = new Contrat(); // Reset for new contract
    }
  }

  modifyF(contrat: Contrat) {
    this.selectedContrat = contrat; // Set the selected contract to modify
    this.modify = true; // Switch to modify mode
    this.toggleAddPopup(); // Show popup
  }

  removeContrat(idContrat: number) {
    /*console.log('Attempting to delete contrat with ID:', idContrat);*/
    if (confirm("Êtes-vous sûr de vouloir supprimer ce contrat ?")) {
      this.services.removeContrat(idContrat).subscribe(() => {
        console.log('Contrat deleted successfully');
        this.getContrats(); // Refresh the list after deletion
      }, error => {
        console.error('Error deleting contrat:', error);
        alert('Error deleting contrat');
      });
    }
  }








  addOrUpdateContrat() {
    if (this.modify) {
      this.services.updateContrat(this.selectedContrat).subscribe(() => {
        this.getContrats(); // Refresh the list after update
        this.toggleAddPopup(); // Hide popup
      }, error => {
        alert('Error updating contrat');
      });
    } else {
      this.services.addContrat(this.selectedContrat).subscribe(() => {
        this.getContrats(); // Refresh the list after addition
        this.toggleAddPopup(); // Hide popup
      }, error => {
        alert('Error adding contrat');
      });
    }
  }
}
