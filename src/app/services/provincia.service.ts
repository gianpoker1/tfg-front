import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provincia } from '../models/provincia.model';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  private baseUrl = 'http://localhost:8080/api/provincias';

  constructor(private http: HttpClient) { }

  obtenerProvincias(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(this.baseUrl);
  }

  obtenerProvinciaPorId(id: number): Observable<Provincia> {
    return this.http.get<Provincia>(`${this.baseUrl}/${id}`);
  }

  agregarProvincia(provincia: Provincia): Observable<Provincia> {
    return this.http.post<Provincia>(this.baseUrl, provincia);
  }

  actualizarProvincia(id: number, provincia: Provincia): Observable<Provincia> {
    return this.http.put<Provincia>(`${this.baseUrl}/${id}`, provincia);
  }

  eliminarProvincia(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}