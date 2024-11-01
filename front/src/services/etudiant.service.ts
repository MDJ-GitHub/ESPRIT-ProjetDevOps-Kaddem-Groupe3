import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etudiant } from '../models/etudiant';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private baseUrl = 'http://localhost:8089/kaddem/etudiant';

  constructor(private http: HttpClient) {}

  getEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${this.baseUrl}/retrieve-all-etudiants`);
  }

 

  getEtudiantById(idEtudiant: number): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.baseUrl}/retrieve-etudiant/${idEtudiant}`);
  }

  addEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.post<Etudiant>(`${this.baseUrl}/add-etudiant`, etudiant);
  }

  updateEtudiant(etudiant: Etudiant): Observable<Etudiant> {
    return this.http.put<Etudiant>(`${this.baseUrl}/update-etudiant`, etudiant);
  }

  removeEtudiant(idEtudiant: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove-etudiant/${idEtudiant}`);
  }

  assignEtudiantToDepartement(idEtudiant: number, departementId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/affecter-etudiant-departement/${idEtudiant}/${departementId}`, {});
  }

  addEtudiantWithEquipeAndContract(etudiant: Etudiant, idContrat: number, idEquipe: number): Observable<Etudiant> {
    return this.http.post<Etudiant>(`${this.baseUrl}/add-assign-Etudiant/${idContrat}/${idEquipe}`, etudiant);
  }

  getEtudiantsByDepartement(departementId: number): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${this.baseUrl}/getEtudiantsByDepartement/${departementId}`);
  }
}

