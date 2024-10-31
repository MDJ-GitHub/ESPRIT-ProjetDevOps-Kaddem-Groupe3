import {Component, OnInit} from '@angular/core';
import {Universite} from "../../models/Universite";
import {UniversiteService} from "../../services/UniversiteService";



@Component({
  selector: 'app-universite',
  templateUrl: './universite.component.html',
  styleUrls: ['./universite.component.css']
})
export class UniversiteComponent implements OnInit{
  universites: Universite[] = [];
  selectedUniversite: Universite = { nomUniv: '' };
  isModalOpen = false;

  constructor(private universiteService: UniversiteService) {}

  ngOnInit(): void {
    this.loadUniversites();
  }

  loadUniversites(): void {
    this.universiteService.getAllUniversites().subscribe(
      (data) => {
        this.universites = data;
      },
      (error) => {
        console.error('Error loading universities', error);
      }
    );
  }

  addUniversite(universite: Universite): void {
    this.universiteService.addUniversite(universite).subscribe((newUniversite: Universite) => {
      this.universites.push(newUniversite);
      this.selectedUniversite = { nomUniv: '' }; // Reset the form
    });
  }
  openUpdateModal(universite: Universite): void {
    this.selectedUniversite = { ...universite }; // Copy the selected university data
    this.isModalOpen = true; // Open the modal
  }

  toggleModal(isOpen: boolean): void {
    this.isModalOpen = isOpen; // Toggle modal visibility
  }

  updateUniversite(): void {
    this.universiteService.updateUniversite(this.selectedUniversite).subscribe(() => {
      // Update the local list of universities
      const index = this.universites.findIndex(u => u.idUniv === this.selectedUniversite.idUniv);
      if (index !== -1) {
        this.universites[index] = this.selectedUniversite;
      }
      this.toggleModal(false); // Close the modal
      this.selectedUniversite = { nomUniv: '' }; // Reset the form
    });
  }


  deleteUniversite(id: number): void {
    if (confirm('Are you sure you want to delete this university?')) {
      this.universiteService.deleteUniversite(id).subscribe(() => {
        this.universites = this.universites.filter(univ => univ.idUniv !== id);
      });
    }
  }
}
