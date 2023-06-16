import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class RegistroServiceService {

  private baseUrl = 'http://localhost:8080/auth/registro';

  constructor(private http: HttpClient) { }

  save(usuario: Usuario, tipo: string): Observable<Usuario> {
    
    const payload ={ 
      usuario:{...usuario},
      tipo:tipo
    };
    return this.http.post<Usuario>(this.baseUrl, payload);
  }
}
