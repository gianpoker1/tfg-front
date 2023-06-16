import { Compra } from "./compra.model";
import { Producto } from "./producto.model";
import { Proovedor } from "./proovedor.model";
import { UserTrabajador } from "./user-trabajador";

export interface DetalleCompra {
    compra: Compra;
    proovedor: Proovedor;
    producto: Producto;
    trabajador: UserTrabajador;
}
