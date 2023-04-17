import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TrabajadorService } from '../services/trabajador.service';
import { Trabajador } from '../models/trabajador.model';

@Component({
  selector: 'app-editar-trabajador-dialog',
  templateUrl: './editar-trabajador-dialog.component.html',
  styleUrls: ['./editar-trabajador-dialog.component.css']
})
export class EditarTrabajadorDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditarTrabajadorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public trabajador: Trabajador,
    private trabajadorService: TrabajadorService
  ) { }

  guardarCambios(): void {
    this.trabajadorService.actualizarTrabajador(this.trabajador.idTrabajador, this.trabajador)
      .subscribe(() => {
        this.dialogRef.close(true); // Cerrar el diálogo y actualizar la lista de trabajadores
      });
  }

  cerrarDialog(): void {
    this.dialogRef.close(false); // Cerrar el diálogo sin actualizar la lista de trabajadores
  }

}