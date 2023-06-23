import { ServicioDisponible } from "./ServicioDisponible";
import { ServicioSolicitado } from "./ServicioSolicitado";

export interface ServicioSolicitadoConDisponible {

    servicioSolicitado: ServicioSolicitado[];
    servicioDisponible: ServicioDisponible[];
}
