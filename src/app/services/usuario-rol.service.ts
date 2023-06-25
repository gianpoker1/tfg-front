import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioRol } from '../models/usuarioRol.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRolService {

  private baseUrl = environment.usuarioRolUrl;
  constructor(private http: HttpClient) { }

  findAll(): Observable<UsuarioRol[]> {
    return this.http.get<UsuarioRol[]>(this.baseUrl);
  }

  findById(id: number): Observable<UsuarioRol> {
    return this.http.get<UsuarioRol>(`${this.baseUrl}/${id}`);
  }

  save(usuarioRol: UsuarioRol): Observable<UsuarioRol> {
    return this.http.post<UsuarioRol>(this.baseUrl, usuarioRol);
  }

  update(id: number, usuarioRol: UsuarioRol): Observable<UsuarioRol> {
    return this.http.put<UsuarioRol>(`${this.baseUrl}/${id}`, usuarioRol);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
