import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServicioDisponibleService } from 'src/app/services/servicio-disponible.service';

@Component({
  selector: 'app-eliminar-servicio-disponible-dialog',
  templateUrl: './eliminar-servicio-disponible-dialog.component.html',
  styleUrls: ['./eliminar-servicio-disponible-dialog.component.css']
})
export class EliminarServicioDisponibleDialogComponent implements OnInit {

  servicioDisponibleId!: number;

  constructor(
    public dialogRef: MatDialogRef<EliminarServicioDisponibleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicioDisponibleService: ServicioDisponibleService
  ) { }

  ngOnInit(): void {
    this.servicioDisponibleId = this.data;
  }

  eliminar(): void {
    this.servicioDisponibleService.eliminarServicioDisponible(this.servicioDisponibleId).subscribe(
      () => {
        console.log('Servicio disponible eliminado con exito');
      }, error => {
        console.log('Error al eliminar servicio disponible', error);
      });
    this.dialogRef.close(true);
  }

  cancelar(): void {
      
    this.dialogRef.close(false);
  }

}
