import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { EquipeComponent } from './equipe/equipe.component';
import { ContratComponent } from './contrat/contrat.component';
import { DepartementComponent } from './departement/departement.component';
import { UniversiteComponent } from './universite/universite.component';
import { ReclamationComponent } from './reclamation/reclamation.component';

const routes: Routes = [
  { path:'' , redirectTo: 'etudiant', pathMatch: 'full'},
  { path: 'etudiant', component : EtudiantComponent,  }, 
  { path: 'equipe', component : EquipeComponent},
  { path: 'departement', component : DepartementComponent},
  { path: 'universite', component : UniversiteComponent},
  { path: 'contrat', component : ContratComponent},
  { path: 'reclamation', component : ReclamationComponent},
  { path: '**', component :  EtudiantComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
