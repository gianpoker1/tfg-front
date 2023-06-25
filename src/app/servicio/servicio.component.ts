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
import { delay, filter } from 'rxjs';


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
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getServicios();

  }

  getServicios() {
    this.servicioService.obtenerServicios().subscribe(servicios => {
      this.servicios = servicios;
      this.servicios.forEach(servicio => {
        this.clienteService.obtenerClientePorId(servicio.idCliente).subscribe(userCliente => {
          this.nombresClientes[servicio.idCliente] = userCliente.usuario.nombre;
        });
        this.trabajadorService.obtenerTrabajadorPorId(servicio.idTrabajador).subscribe(userTrabajador => {
          this.nombresTrabajadores[servicio.idTrabajador] = userTrabajador.usuario.nombre;
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

    dialogRef.afterClosed().pipe(
      filter(result => !!result),
      delay(500)
    ).subscribe(result => {
      this.getServicios();
    });
  }

  editarServicioDialog(idServicio: number): void {
    const dialogRef = this.dialog.open(EditarServicioDialogComponent, {
      width: '1000px',
      data: idServicio
    });

    dialogRef.afterClosed().pipe(
      filter(result => !!result),
      delay(500)
    ).subscribe(result => {
      this.getServicios();
    });
  }

  eliminarServicioDialog(idServicio: number): void {
    const dialogRef = this.dialog.open(EliminarServicioDialogComponent, {
      width: '400px',
      data: idServicio
    });

    dialogRef.afterClosed().pipe(
      filter(result => !!result),
      delay(500)
    ).subscribe(result => {
      this.getServicios();
    });
  }


  obtenerEntregado(entregado: boolean): string {
    return entregado ? 'Sí' : 'No';
    }
}