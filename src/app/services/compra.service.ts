import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compra } from '../models/compra.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private baseUrl = environment.compraUrl;

  constructor(private http: HttpClient) { }

  obtenerCompras(): Observable<Compra[]> {
    return this.http.get<Compra[]>(this.baseUrl);
  }

  obtenerCompraPorId(id: number): Observable<Compra> {
    return this.http.get<Compra>(`${this.baseUrl}/${id}`);
  }

  agregarCompra(compra: Compra): Observable<Compra> {
    return this.http.post<Compra>(this.baseUrl, compra);
  }

  actualizarCompra(id: number, compra: Compra): Observable<Compra> {
    return this.http.put<Compra>(`${this.baseUrl}/${id}`, compra);
  }

  eliminarCompra(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}