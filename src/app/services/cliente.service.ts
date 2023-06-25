import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { UserCliente } from '../models/user-cliente';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl = environment.clienteUrl;
  constructor(private http: HttpClient) { }

  obtenerClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl);
  }

  obtenerClientePorId(idCliente: number): Observable<UserCliente> {
    return this.http.get<UserCliente>(`${this.baseUrl}/${idCliente}`);
  }

  obtenerClientePorIdUsuario(idUsuario: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/usuario/${idUsuario}`);
  }

  agregarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.baseUrl, cliente);
  }

  actualizarCliente(idCliente: number, idUsuario: number, userCliente: UserCliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/cliente/${idCliente}/usuario/${idUsuario}`, userCliente);
  }

  eliminarCliente(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}