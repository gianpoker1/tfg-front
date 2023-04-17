import { Observable } from "rxjs";
import { Usuario } from "../models/usuario.model";

export interface UsuarioService {
    findAll(): Observable<Usuario[]>;
    findById(id: number): Observable<Usuario>;
    save(usuario: Usuario): Observable<Usuario>;
    update(id: number, usuario: Usuario): Observable<Usuario>;
    delete(id: number): Observable<any>;
}
