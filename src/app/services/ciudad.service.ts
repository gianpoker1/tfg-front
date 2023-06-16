import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ciudad } from '../models/ciudad.model';
import { CiudadConProvinciaYPais } from '../models/ciudad-con-provincia-ypais';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  private baseUrl = 'http://localhost:8080/api/ciudades';

  constructor(private http: HttpClient) { }

  obtenerCiudades(): Observable<Ciudad[]> {
    return this.http.get<Ciudad[]>(this.baseUrl);
  }

  obtenerCiudadPorId(id: number): Observable<Ciudad> {
    return this.http.get<Ciudad>(`${this.baseUrl}/${id}`);
  }

  agregarCiudad(ciudad: Ciudad): Observable<Ciudad> {
    return this.http.post<Ciudad>(this.baseUrl, ciudad);
  }

  actualizarCiudad(id: number, ciudad: Ciudad): Observable<Ciudad> {
    return this.http.put<Ciudad>(`${this.baseUrl}/${id}`, ciudad);
  }

  eliminarCiudad(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  obtenerCiudadConProvinciaYPais(idCiudad: number): Observable<CiudadConProvinciaYPais>{
    const url = `${this.baseUrl}/conProYPais/${idCiudad}`;
    return this.http.get<CiudadConProvinciaYPais>(url);
  }
}