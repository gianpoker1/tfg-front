import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicioDisponible } from '../models/ServicioDisponible';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ServicioDisponibleService {

  private baseUrl = environment.servicioDisponibleUrl;
  constructor(private http: HttpClient) { }

  obtenerServiciosDisponibles(): Observable<ServicioDisponible[]> {
    return this.http.get<ServicioDisponible[]>(this.baseUrl);
  }

  obtenerServicioDisponiblePorId(id: number): Observable<ServicioDisponible> {
    return this.http.get<ServicioDisponible>(`${this.baseUrl}/${id}`);
  }

  agregarServicioDisponible(servicioDisponible: ServicioDisponible): Observable<ServicioDisponible> {
    return this.http.post<ServicioDisponible>(this.baseUrl, servicioDisponible);
  }

  actualizarServicioDisponible(id: number, servicioDisponible: ServicioDisponible): Observable<ServicioDisponible> {
    return this.http.put<ServicioDisponible>(`${this.baseUrl}/${id}`, servicioDisponible);
  }

  eliminarServicioDisponible(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
