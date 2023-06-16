import { Cliente } from "./cliente.model";
import { Usuario } from "./usuario.model";

export interface UserCliente {

    usuario: Usuario;
    cliente: Cliente;
}
