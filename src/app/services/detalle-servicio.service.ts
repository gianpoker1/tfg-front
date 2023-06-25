import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalleServicio } from '../models/detalle-servicio.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DetalleServicioService {

  private baseUrl = environment.detalleServicioUrl;

  constructor(private http: HttpClient) { }

  obtenerDetallesServicio(): Observable<DetalleServicio[]> {
    return this.http.get<DetalleServicio[]>(this.baseUrl);
  }

  obtenerDetalleServicioPorId(id: number): Observable<DetalleServicio> {
    return this.http.get<DetalleServicio>(`${this.baseUrl}/${id}`);
  }

  agregarDetalleServicio(detalleServicio: DetalleServicio): Observable<DetalleServicio> {
    return this.http.post<DetalleServicio>(this.baseUrl, detalleServicio);
  }

  actualizarDetalleServicio(id: number, detalleServicio: DetalleServicio): Observable<DetalleServicio> {
    return this.http.put<DetalleServicio>(`${this.baseUrl}/${id}`, detalleServicio);
  }

  eliminarDetalleServicio(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}