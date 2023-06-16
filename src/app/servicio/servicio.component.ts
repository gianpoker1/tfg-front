import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Servicio } from 'src/app/models/servicio.model';
import { ServicioService } from 'src/app/services/servicio.service';
import { EditarServicioDialogComponent } from './editar-servicio-dialog/editar-servicio-dialog.component';
import { EliminarServicioDialogComponent } from './eliminar-servicio-dialog/eliminar-servicio-dialog.component';
import { AgregarServicioDialogComponent } from './agregar-servicio-dialog/agregar-servicio-dialog.component';
import { ClienteService } from '../services/cliente.service';
import { TrabajadorService } from '../services/trabajador.service';
import { Cliente } from '../models/cliente.model';
import { Trabajador } from '../models/trabajador.model';
import { UsuarioService } from '../services/usuario.service';


@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

  servicios!: Servicio[];
  clientes: Cliente[] = [];
  trabajadores: Trabajador[] = [];
  nombresClientes: { [idCliente: number]: string } = {};
  nombresTrabajadores: { [idServicio: number]: string } = {};
  nombresServicios: { [idDetalle: number]: string } = {};

  columnas: string[] = ['Cliente', 'fechaInicio', 'fechaEntrega', 'entregado', 'NombreServicio', 'Trabajador', 'acciones'];

  constructor(
    private servicioService: ServicioService,
    private clienteService: ClienteService,
    private trabajadorService: TrabajadorService,
    private usuarioService: UsuarioService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getServicios();

  }

  getServicios() {
    this.servicioService.obtenerServicios().subscribe(servicios => {
      this.servicios = servicios;
      this.servicios.forEach(servicio => {
        this.usuarioService.findById(servicio.idCliente).subscribe(
          usuario => {
          this.nombresClientes[servicio.idCliente] = usuario.nombre;
        });
        this.usuarioService.findById(servicio.idTrabajador).subscribe(
          usuario => {
          this.nombresTrabajadores[servicio.idServicio] = usuario.nombre;
        });
      });
    });
  }

  getClientes(): void {
    this.clienteService.obtenerClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  getTrabajadores(): void {
    this.trabajadorService.obtenerTrabajadores().subscribe(trabajadores => {
      this.trabajadores = trabajadores;
    });
  }


  agregarServicioDialog(): void {
    const dialogRef = this.dialog.open(AgregarServicioDialogComponent, {
      width: '1000px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.servicioService.agregarServicio(result).subscribe(() => {
          this.getServicios();
        });
      }
    });
  }

  editarServicioDialog(idServicio: number): void {
    const dialogRef = this.dialog.open(EditarServicioDialogComponent, {
      width: '1000px',
      data: idServicio
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.servicioService.obtenerServicios().subscribe(servicios => {
          this.servicios = servicios;
        });
      }
    });
  }

  eliminarServicioDialog(idServicio: number): void {
    const dialogRef = this.dialog.open(EliminarServicioDialogComponent, {
      width: '400px',
      data: idServicio
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.servicioService.obtenerServicios().subscribe(servicios => {
          this.servicios = servicios;
        });
      }
    });
  }


  obtenerEntregado(entregado: boolean): string {
    return entregado ? 'Sí' : 'No';
    }
}