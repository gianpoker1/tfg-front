import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServicioSolicitadoService } from 'src/app/services/servicio-solicitado.service';

@Component({
  selector: 'app-eliminar-servicio-solicitado-admin-dialog',
  templateUrl: './eliminar-servicio-solicitado-admin-dialog.component.html',
  styleUrls: ['./eliminar-servicio-solicitado-admin-dialog.component.css']
})
export class EliminarServicioSolicitadoAdminDialogComponent implements OnInit{

  servicioSolicitadoId!: number;

  constructor(
    public dialogRef: MatDialogRef<EliminarServicioSolicitadoAdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private servicioSolicitadoService: ServicioSolicitadoService
  ) { }

  ngOnInit(): void {
    this.servicioSolicitadoId = this.data;
  }

  eliminar(): void{
    this.servicioSolicitadoService.eliminarServicioSolicitado(this.servicioSolicitadoId)
    .subscribe(() =>{
      console.log('Servicio solicitado eliminado con exito');
    },error =>{
      console.log('Error al eliminar servicio solicitado', error);
    });
    this.dialogRef.close(true);
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

}
