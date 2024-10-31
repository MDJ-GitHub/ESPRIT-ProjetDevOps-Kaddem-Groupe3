import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contrat } from 'src/models/Contrat';
import { Etudiant } from 'src/models/Etudiant';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class Services {

  private baseUrl = `${environment.apiUrl}/contrat`;

  constructor(private http: HttpClient) {}

  getContrat(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.baseUrl}/retrieve-all-contrats`);
  }
  retrieveContrat(contratid: number): Observable<Contrat> {
    return this.http.get<Contrat>(`${this.baseUrl}/retrieve-contrat/${contratid}`);
  }
  addContrat(e: Contrat): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add-contrat`,e);
  }
  removeContrat(contratid: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/remove-contrat/${contratid}`);
  }
  updateContrat(e: Contrat): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update-contrat/`, e);
  }

}
