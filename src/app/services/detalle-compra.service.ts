import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetalleCompra } from '../models/detalle-compra.model';

@Injectable({
  providedIn: 'root'
})
export class DetalleCompraService {

  private baseUrl = 'http://localhost:8080/api/detalles-compra';

  constructor(private http: HttpClient) { }

  obtenerDetallesCompra(): Observable<DetalleCompra[]> {
    return this.http.get<DetalleCompra[]>(this.baseUrl);
  }

  obtenerDetalleCompraPorId(id: number): Observable<DetalleCompra> {
    return this.http.get<DetalleCompra>(`${this.baseUrl}/${id}`);
  }

  agregarDetalleCompra(detalleCompra: DetalleCompra): Observable<DetalleCompra> {
    return this.http.post<DetalleCompra>(this.baseUrl, detalleCompra);
  }

  actualizarDetalleCompra(id: number, detalleCompra: DetalleCompra): Observable<DetalleCompra> {
    return this.http.put<DetalleCompra>(`${this.baseUrl}/${id}`, detalleCompra);
  }

  eliminarDetalleCompra(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}