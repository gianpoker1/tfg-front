import { Ciudad } from "./ciudad.model";
import { Cliente } from "./cliente.model";
import { Pais } from "./pais.model";
import { Provincia } from "./provincia.model";
import { Trabajador } from "./trabajador.model";

export class Usuario {
    id!: number;
    userName!: string;
    password!: string;
    DNI!: string;
    nombre!: string;
    apellido!: string;
    telefono!: string;
    direccion!: string;
    trabajador!: Trabajador;
    cliente!: Cliente;
    pais!: Pais;
    ciudad!: Ciudad;
    provincia!: Provincia;
    roles!: Usuario[];
    tipo!: string;
  }