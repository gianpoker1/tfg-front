import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trabajador } from '../models/trabajador.model';
import { UserTrabajador } from '../models/user-trabajador';
import { TrabajadorRol } from '../models/trabajador-rol';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {

  private baseUrl = 'http://localhost:8080/api/trabajadores';

  constructor(private http: HttpClient) { }

  obtenerTrabajadores(): Observable<Trabajador[]> {
    return this.http.get<Trabajador[]>(this.baseUrl);
  }

  obtenerTrabajadorPorId(idTrabajador: number): Observable<UserTrabajador> {
    return this.http.get<UserTrabajador>(`${this.baseUrl}/${idTrabajador}`);
  }

  agregarTrabajador(trabajadorRol: TrabajadorRol): Observable<TrabajadorRol> {
    return this.http.post<TrabajadorRol>(this.baseUrl, trabajadorRol);
  }

  actualizarTrabajador(idTrabajador: number, idUsuario: number, userTrabajador: UserTrabajador): Observable<Trabajador> {
    return this.http.put<Trabajador>(`${this.baseUrl}/trabajador/${idTrabajador}/usuario/${idUsuario}`, userTrabajador);
  }

  eliminarTrabajador(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  obtenerTrabajadorPorIdUsuario(idUsuario: number): Observable<Trabajador> {
    return this.http.get<Trabajador>(`${this.baseUrl}/usuario/${idUsuario}`);
  }
}