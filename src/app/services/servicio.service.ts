import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicio } from '../models/servicio.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private baseUrl = environment.servicioUrl;

  constructor(private http: HttpClient) { }

  obtenerServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.baseUrl);
  }

  obtenerServicioPorId(id: number): Observable<Servicio> {
    return this.http.get<Servicio>(`${this.baseUrl}/${id}`);
  }

  agregarServicio(servicio: Servicio): Observable<Servicio> {
    return this.http.post<Servicio>(this.baseUrl, servicio);
  }

  actualizarServicio(id: number, servicio: Servicio): Observable<Servicio> {
    return this.http.put<Servicio>(`${this.baseUrl}/${id}`, servicio);
  }

  eliminarServicio(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  obtenerServiciosPorIdUsuario(idUsuario: number): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(`${this.baseUrl}/usuario/${idUsuario}`);
  }
}