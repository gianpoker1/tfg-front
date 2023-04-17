import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Servicio } from 'src/app/models/servicio.model';
import { ServicioService } from 'src/app/services/servicio.service';
import { EditarServicioDialogComponent } from '../editar-servicio-dialog/editar-servicio-dialog.component';
import { EliminarServicioDialogComponent } from '../eliminar-servicio-dialog/eliminar-servicio-dialog.component';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

  servicios!: Servicio[];

  columnas: string[] = ['idServicio', 'idCliente', 'fechaInicio', 'fechaEntrega', 'entregado', 'idDetalleServicio', 'idTrabajador', 'acciones'];

  constructor(private servicioService: ServicioService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getServicios();
  }

  getServicios() {
    this.servicioService.obtenerServicios().subscribe(servicios => {
      this.servicios = servicios;
    });
  }

  editarServicioDialog(idServicio: number): void {
    const dialogRef = this.dialog.open(EditarServicioDialogComponent, {
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

}