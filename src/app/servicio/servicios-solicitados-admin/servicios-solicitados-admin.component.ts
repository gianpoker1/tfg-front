import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServicioSolicitado } from 'src/app/models/ServicioSolicitado';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { ServicioSolicitadoService } from 'src/app/services/servicio-solicitado.service';
import { NotaAdicionalModalComponent } from '../nota-adicional-modal/nota-adicional-modal.component';
import { EditarServicioSolicitadoAdminDialogComponent } from '../editar-servicio-solicitado-admin-dialog/editar-servicio-solicitado-admin-dialog.component';
import { delay, filter } from 'rxjs';
import { EliminarServicioSolicitadoAdminDialogComponent } from '../eliminar-servicio-solicitado-admin-dialog/eliminar-servicio-solicitado-admin-dialog.component';
import { ServicioDisponibleService } from 'src/app/services/servicio-disponible.service';

@Component({
  selector: 'app-servicios-solicitados-admin',
  templateUrl: './servicios-solicitados-admin.component.html',
  styleUrls: ['./servicios-solicitados-admin.component.css']
})
export class ServiciosSolicitadosAdminComponent implements OnInit{

  serviciosSolicitados!: ServicioSolicitado[];
  clientes: Cliente[] = [];
  nombresClientes: { [idCliente: number]: string } = {};
  nombresServiciosDisponibles: { [id: number]: string } = {};


  columnas: string[] = ['cliente', 'fecha', 'estado', 'duracion', 'servicioDisponible', 'notasAdicionales', 'acciones'];

  constructor(
    private servicioSolitadoService: ServicioSolicitadoService,
    private servicioDisponibleService: ServicioDisponibleService,
    private clienteService: ClienteService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getServiciosSolicitados();
  }

  getServiciosSolicitados(): void {
    this.servicioSolitadoService.obtenerServiciosSolicitados().subscribe(serviciosSolicitados => {
      this.serviciosSolicitados = serviciosSolicitados;
      console.log('SERVICIOS SOLICITADOS: ',this.serviciosSolicitados);
      this.serviciosSolicitados.forEach(servicioSolicitado => {
        this.clienteService.obtenerClientePorId(servicioSolicitado.idCliente).subscribe(userCliente => {
          this.nombresClientes[servicioSolicitado.idCliente] = userCliente.usuario.nombre;
        });

        // Obtiene el nombre del servicio disponible para cada servicio solicitado
        this.servicioDisponibleService.obtenerServicioDisponiblePorId(servicioSolicitado.idServicioDisponible).subscribe(servicioDisponible => {
          this.nombresServiciosDisponibles[servicioSolicitado.idServicioDisponible] = servicioDisponible.nombre;
        });
      });
    });
  }

  editarServicioSolicitado(idServicioSolicitado: number): void {
    const dialogRef = this.dialog.open(EditarServicioSolicitadoAdminDialogComponent,{
      width: '1000px',
      data: idServicioSolicitado
    });

    dialogRef.afterClosed().pipe(
      filter(result => !!result),
      delay(500)
    ).subscribe(result => {
      this.getServiciosSolicitados();
    });
  }

  eliminarServicioDialog(idServicio: number): void{
    const dialogRef = this.dialog.open(EliminarServicioSolicitadoAdminDialogComponent, {
      width: '500px',
      data: idServicio
    });

    dialogRef.afterClosed().pipe(
      filter(result => !!result),
      delay(500)
    ).subscribe(result => {
      this.getServiciosSolicitados();
    });
  }

  openModal(notas: string): void{
    const dialogRef = this.dialog.open(NotaAdicionalModalComponent,{
      width: '500px',
      data: notas
   });

   dialogRef.afterClosed().subscribe(result => {
   });
  }
}
