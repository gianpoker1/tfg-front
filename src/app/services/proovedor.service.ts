import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Proovedor } from '../models/proovedor.model';

@Injectable({
  providedIn: 'root'
})
export class ProovedorService {

  private baseUrl = 'http://localhost:8080/api/proovedores';

  constructor(private http: HttpClient) { }

  obtenerProovedores(): Observable<Proovedor[]> {
    return this.http.get<Proovedor[]>(this.baseUrl);
  }

  obtenerProovedorPorId(id: number): Observable<Proovedor> {
    return this.http.get<Proovedor>(`${this.baseUrl}/${id}`);
  }

  agregarProovedor(proovedor: Proovedor): Observable<Proovedor> {
    return this.http.post<Proovedor>(this.baseUrl, proovedor);
  }

  actualizarProovedor(id: number, proovedor: Proovedor): Observable<Proovedor> {
    return this.http.put<Proovedor>(`${this.baseUrl}/${id}`, proovedor);
  }

  eliminarProovedor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}