import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ServicioDisponible } from 'src/app/models/ServicioDisponible';
import { ServicioDisponibleService } from 'src/app/services/servicio-disponible.service';
import { AgregarServicioDisponibleDialogComponent } from '../agregar-servicio-disponible-dialog/agregar-servicio-disponible-dialog.component';
import { EditarServicioDisponibleDialogComponent } from '../editar-servicio-disponible-dialog/editar-servicio-disponible-dialog.component';
import { EliminarServicioDisponibleDialogComponent } from '../eliminar-servicio-disponible-dialog/eliminar-servicio-disponible-dialog.component';
import { delay, filter } from 'rxjs';

@Component({
  selector: 'app-servicios-disponibles-admin',
  templateUrl: './servicios-disponibles-admin.component.html',
  styleUrls: ['./servicios-disponibles-admin.component.css']
})
export class ServiciosDisponiblesAdminComponent {

  serviciosDisponibles: ServicioDisponible[]=[];


  columnas: string[] = ['idServicioDisponible', 'nombre', 'descripcion', 'precio', 'duracion', 'acciones'];

  constructor(
    private servicioDisponibleService: ServicioDisponibleService,
    public dialog: MatDialog
  ) { }


  ngOnInit(): void {
    this.getServiciosDisponibles();
  }

  getServiciosDisponibles() : void{
    this.servicioDisponibleService.obtenerServiciosDisponibles().subscribe(serviciosDisponibles => {
      this.serviciosDisponibles = serviciosDisponibles;
    });
  }


  agregarServicioDiponibleDialog() : void{
    const dialogRef = this.dialog.open(AgregarServicioDisponibleDialogComponent, {
      width: '1000px',
    });

    dialogRef.afterClosed().pipe(
      filter(result => !!result),
      delay(500)
    ).subscribe(result => {
      this.getServiciosDisponibles();
    });
  }

  editarServicioDisponibleDialog(idServicioDisponible: number) : void{
    const dialogRef = this.dialog.open(EditarServicioDisponibleDialogComponent, {
      width: '1000px',
      data: idServicioDisponible
      });

      dialogRef.afterClosed().pipe(
        filter(result => !!result),
        delay(500)
      ).subscribe(result => {
        this.getServiciosDisponibles();
      });
  }

  eliminarServicioDisponibleDialog(idServicioDisponible: number) : void{
    const dialogRef = this.dialog.open(EliminarServicioDisponibleDialogComponent, {
      width: '400px',
      data: idServicioDisponible
      });

      dialogRef.afterClosed().pipe(
        filter(result => !!result),
        delay(500)
      ).subscribe(result => {
        this.getServiciosDisponibles();
      });
  }


}
