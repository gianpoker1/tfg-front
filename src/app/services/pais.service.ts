import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pais } from '../models/pais.model';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private baseUrl = 'http://localhost:8080/api/paises';

  constructor(private http: HttpClient) { }

  obtenerPaises(): Observable<Pais[]> {
    return this.http.get<Pais[]>(this.baseUrl);
  }

  obtenerPaisPorId(id: number): Observable<Pais> {
    return this.http.get<Pais>(`${this.baseUrl}/${id}`);
  }

  agregarPais(pais: Pais): Observable<Pais> {
    return this.http.post<Pais>(this.baseUrl, pais);
  }

  actualizarPais(id: number, pais: Pais): Observable<Pais> {
    return this.http.put<Pais>(`${this.baseUrl}/${id}`, pais);
  }

  eliminarPais(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}