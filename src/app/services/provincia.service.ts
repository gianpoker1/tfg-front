import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provincia } from '../models/provincia.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  private baseUrl = environment.provinciaUrl;

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

  obtenerProvinciaConNombrePais(idProvincia: number): Observable<{provincia: Provincia, nombrePais: string}>{
    return this.http.get<{provincia: Provincia, nombrePais: string}>(`${this.baseUrl}/conNombrePais/${idProvincia}`);
  }
}