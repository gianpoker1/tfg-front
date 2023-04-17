import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<{access_token: string}>(`${this.baseUrl}/auth/login`, {email: email, password: password})
      .pipe(
        tap(
          result => {
          localStorage.setItem('access_token',result.access_token);
          console.log('Token almacenado en LocalStorage: ' + result.access_token);
        }),
        map(result => true),
        catchError(error => {
          console.error(error);
          return of(false);
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  get isLoggedIn() {
    return localStorage.getItem('access_token') !== null;
  }


  redirectToTipoPage(tipo: string){
    if(tipo === 'TRABAJADOR'){
      this.router.navigate(['/trabajador']);
    }else{
      this.router.navigate(['/cliente']);
    }
  }
}