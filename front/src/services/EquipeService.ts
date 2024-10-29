import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Equipe } from 'src/models/Equipe';
import { Etudiant } from 'src/models/Etudiant';
import { DetailEquipe } from 'src/models/DetailEquipe';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class Services {

  private baseUrl = `${environment.apiUrl}/equipe`;

  constructor(private http: HttpClient) {}

  getEquipes(): Observable<Equipe[]> {
    return this.http.get<Equipe[]>(`${this.baseUrl}/retrieve-all-equipes`);
  }
  retrieveEquipe(equipeid: number): Observable<Equipe> {
    return this.http.get<Equipe>(`${this.baseUrl}/retrieve-equipe/${equipeid}`);
  }
  addEquipe(e: Equipe): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add-equipe`,e);
  }
  removeEquipe(equipeid: number): Observable<Equipe> {
    return this.http.delete<Equipe>(`${this.baseUrl}/remove-equipe/${equipeid}`);
  }
  updateEquipe(e: Equipe): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/update-equipe/`, e);
  }

}