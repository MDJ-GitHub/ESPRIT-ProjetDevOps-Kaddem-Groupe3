import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EquipeComponent } from './equipe/equipe.component';
import { EtudiantComponent } from './etudiant/etudiant.component';
import { ContratComponent } from './contrat/contrat.component';
import { DepartementComponent } from './departement/departement.component';
import { UniversiteComponent } from './universite/universite.component';
import { ReclamationComponent } from './reclamation/reclamation.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EquipeComponent,
    EtudiantComponent,
    ContratComponent,
    DepartementComponent,
    UniversiteComponent,
    ReclamationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
