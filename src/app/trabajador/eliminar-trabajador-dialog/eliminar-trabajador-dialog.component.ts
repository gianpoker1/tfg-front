import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TrabajadorService } from 'src/app/services/trabajador.service';

@Component({
  selector: 'app-eliminar-trabajador-dialog',
  templateUrl: './eliminar-trabajador-dialog.component.html',
  styleUrls: ['./eliminar-trabajador-dialog.component.css']
})
export class EliminarTrabajadorDialogComponent implements OnInit {

  idTrabajador!: number;
  nombreUsuario!: string;

  constructor(
    public dialogRef: MatDialogRef<EliminarTrabajadorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private trabajadorService: TrabajadorService
  ) { }

  ngOnInit(): void {
    this.trabajadorService.obtenerTrabajadorPorId(this.data).subscribe(userTrabajador => {
      this.nombreUsuario = userTrabajador.usuario.nombre;
      this.idTrabajador = userTrabajador.trabajador.idTrabajador;
    });
  }

  eliminarTrabajador(): void {
    this.trabajadorService.eliminarTrabajador(this.idTrabajador).subscribe(() => {
      this.dialogRef.close(true); // Cerrar el diálogo y actualizar la lista de trabajadores
    });
  }

  cancelar(): void {
    this.dialogRef.close(false); // Cerrar el diálogo sin hacer nada
  }

}
