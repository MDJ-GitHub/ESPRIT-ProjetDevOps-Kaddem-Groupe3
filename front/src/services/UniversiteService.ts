import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Universite} from "../models/Universite";
import {environment} from "../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class UniversiteService {

  private apiUrl = `${environment.apiUrl}/universite`

  constructor(private http: HttpClient) { }


  getAllUniversites(): Observable<Universite[]> {
    return this.http.get<Universite[]>(`${this.apiUrl}/retrieve-all-universites`);
  }

  addUniversite(universite: Universite | null): Observable<Universite> {
    return this.http.post<Universite>(`${this.apiUrl}/add-universite`, universite);
  }


  updateUniversite(universite: Universite): Observable<Universite> {
    return this.http.put<Universite>(`${this.apiUrl}/update-universite`, universite);
  }


  getUniversiteById(id: number): Observable<Universite> {
    return this.http.get<Universite>(`${this.apiUrl}/${id}`);
  }


  deleteUniversite(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/remove-universite/${id}`);
  }


  assignUniversiteToDepartement(idUniv: number, idDep: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${idUniv}/departements/${idDep}`, {});
  }
}
