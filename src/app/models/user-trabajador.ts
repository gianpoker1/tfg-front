import { Trabajador } from "./trabajador.model";
import { Usuario } from "./usuario.model";

export interface UserTrabajador {

    usuario: Usuario;
    trabajador: Trabajador;
    roles: string[];
}
