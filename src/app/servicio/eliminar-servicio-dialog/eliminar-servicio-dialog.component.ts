import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-eliminar-servicio-dialog',
  templateUrl: './eliminar-servicio-dialog.component.html',
  styleUrls: ['./eliminar-servicio-dialog.component.css']
})
export class EliminarServicioDialogComponent implements OnInit {

  servicioId!: number;

  constructor(
    public dialogRef: MatDialogRef<EliminarServicioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicioService: ServicioService
  ) { }

  ngOnInit(): void {
    this.servicioId = this.data;
  }

  eliminar(): void {
    this.servicioService.eliminarServicio(this.servicioId).subscribe(
      () => {
        console.log('Servicio eliminado con exito');
      }, error => {
        console.log('Error al eliminar servicio', error);
      });
    this.dialogRef.close(true);
  }

  cancelar(): void {
    
    this.dialogRef.close(false);
  }

}