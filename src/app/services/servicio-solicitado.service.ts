import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicioSolicitado } from '../models/ServicioSolicitado';
import { ServicioSolicitadoConDisponible } from '../models/servicio-solicitado-con-disponible';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ServicioSolicitadoService {

  private baseUrl = environment.servicioSolicitadoUrl;

  constructor(private http: HttpClient) { }

  obtenerServiciosSolicitados(): Observable<ServicioSolicitado[]> {
    return this.http.get<ServicioSolicitado[]>(this.baseUrl);
  }

  obtenerServicioSolicitadoPorId(id: number): Observable<ServicioSolicitado> {
    return this.http.get<ServicioSolicitado>(`${this.baseUrl}/${id}`);
  }

  obtenerServiciosSolicitadosPorIdCliente(id: number): Observable<ServicioSolicitadoConDisponible[]> {
    return this.http.get<ServicioSolicitadoConDisponible[]>(`${this.baseUrl}/usuario/${id}`);
  }

  agregarServicioSolicitado(servicioSolicitado: ServicioSolicitado): Observable<ServicioSolicitado> {
    return this.http.post<ServicioSolicitado>(this.baseUrl, servicioSolicitado);
  }

  actualizarServicioSolicitado(id: number, servicioSolicitado: ServicioSolicitado): Observable<ServicioSolicitado> {
    return this.http.put<ServicioSolicitado>(`${this.baseUrl}/${id}`, servicioSolicitado);
  }

  eliminarServicioSolicitado(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

}
