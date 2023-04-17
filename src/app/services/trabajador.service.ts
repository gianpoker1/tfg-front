import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trabajador } from '../models/trabajador.model';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {

  private baseUrl = 'http://localhost:8080/api/trabajadores';

  constructor(private http: HttpClient) { }

  obtenerTrabajadores(): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]>(this.baseUrl);
  }

  obtenerTrabajadorPorId(id: number): Observable<Trabajador> {
    return this.http.get<Trabajador>(`${this.baseUrl}/${id}`);
  }

  agregarTrabajador(trabajador: Trabajador): Observable<Trabajador> {
    return this.http.post<Trabajador>(this.baseUrl, trabajador);
  }

  actualizarTrabajador(id: number, trabajador: Trabajador): Observable<Trabajador> {
    return this.http.put<Trabajador>(`${this.baseUrl}/${id}`, trabajador);
  }

  eliminarTrabajador(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}