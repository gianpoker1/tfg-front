import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable,  of } from 'rxjs';
import { catchError, map,  switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginStateServiceService } from './login-state-service.service';
import { Usuario } from '../models/usuario.model';
import { UsuarioRolService } from './usuario-rol.service';
import { RolService } from './rol.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ClienteService } from './cliente.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080';

  private hasManagerRoleSubject = new BehaviorSubject<boolean>(false);
  public hasManagerRole$ = this.hasManagerRoleSubject.asObservable();

  constructor(private http: HttpClient,
    private router: Router,
    private loginStateService: LoginStateServiceService,
    private usuarioRolService: UsuarioRolService,
    private rolService: RolService,
    private clienteService: ClienteService,
    private jwtHelper: JwtHelperService) { }


  login(userName: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string; userName: string }>(
      `${this.baseUrl}/auth/login`,
      { userName: userName, password: password }
    ).pipe(
      tap(result => {
        localStorage.setItem('token', result.token);
      }),
      switchMap(() => {
        return this.getUserByEmail(userName)
      }),
      tap(user => {
        this.storeUser(user);
        this.loginStateService.changeLoginStatus(true);
      }),
      map(user => true),
      catchError(error => {
        console.error(error);
        return of(false);
      })
    );
  }

  private isTokenExpired(token: string): boolean {
    const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    const isExpired = this.jwtHelper.isTokenExpired(token);
    return isExpired;
  }

  // Método para obtener el objeto Usuario por email
  getUserByEmail(email: string): Observable<Usuario> {
    const url = `${this.baseUrl}/api/usuarios/userName/${email}`;
    return this.http.get<Usuario>(url);
  }

  // Método para almacenar el objeto Usuario en el localStorage
  storeUser(user: Usuario) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('token');
    this.loginStateService.changeLoginStatus(false);
  }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && !this.isTokenExpired(token);
  }


  redirectToTipoPage(tipo: string) {
    if (tipo === 'TRABAJADOR') {
      this.router.navigate(['/trabajador']);
    } else {
      this.router.navigate(['/cliente']);
    }
  }

  get user(): Usuario | null {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      return JSON.parse(userJson) as Usuario;
    }
    return null;
  }


  // Verificar si el usuario tiene el rol de "ROLE_MANAGER"
  public async hasManagerRole(): Promise<boolean> {
    const user = this.user?.roles;
    if (user) {
      const usuarioRolPromises = user.map(rol => this.usuarioRolService.findById(rol).toPromise());
      const usuarioRols = await Promise.all(usuarioRolPromises);
      const idRoles = usuarioRols.map(usuarioRol => usuarioRol?.rol?.id);
      const rolPromises = idRoles.map(idRol => idRol ? this.rolService.findById(idRol).toPromise() : Promise.resolve(null));
      const roles = await Promise.all(rolPromises);
      const hasManagerRole = roles.some(rol => rol && rol.nombre === 'ROLE_MANAGER');
      if (hasManagerRole) {
        console.log('El usuario tiene el rol de "ROLE_MANAGER"');
        return true;
      } else {
        console.log('El usuario NO tiene el rol de "ROLE_MANAGER"');
        return false;
      }
    }
    return false;
  }

  getTrabajadorId(): number | undefined {
    const user = this.user;
    if (user) {
      return user.id;
    }
    return undefined;
  }

  getClienteId(): Observable<number | undefined> {
    const user = this.user;
    if(user){
      return this.clienteService.obtenerClientePorIdUsuario(user.id).pipe(
          map (cliente => cliente.idCliente),
          catchError(error => {
            console.error(error);
            return of(undefined);
          })
        );
    }
    return of(undefined);
  }
  
  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const roles = decodedToken.roles;
      return roles && roles.includes('ROLE_ADMIN');
    }
    return false;
  }


  public isTrabajador(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const roles = decodedToken.roles;
      return roles && roles.includes('ROLE_MANAGER');
    }
    return false;
  }

  public isCliente(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const roles = decodedToken.roles;
      return roles && roles.includes('ROLE_USER');
    }
    return false;
  }

  


}