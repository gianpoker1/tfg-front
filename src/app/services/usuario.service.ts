import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private baseUrl = environment.usuarioUrl;

  constructor(private http: HttpClient) { }

  findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl);
  }

  findById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/${id}`);
  }

  findByUserName(userName: string): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.baseUrl}/userName/${userName}`);
  }

  save(usuario: Usuario, tipo: string): Observable<Usuario> {
    const options = {
      headers: new HttpHeaders({
      'Content-Type': 'application/json'
      }),
      params: new HttpParams().set('tipo', tipo)
    };
    const payload = {...usuario, tipo};
    return this.http.post<Usuario>(this.baseUrl, payload);
  }

  update(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.baseUrl}/${id}`, usuario);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }


  
}
