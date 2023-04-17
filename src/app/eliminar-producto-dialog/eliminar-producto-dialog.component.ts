import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-eliminar-producto-dialog',
  templateUrl: './eliminar-producto-dialog.component.html',
  styleUrls: ['./eliminar-producto-dialog.component.css']
})
export class EliminarProductoDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EliminarProductoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  cancelar(): void {
    this.dialogRef.close(false); // Cerrar el diálogo sin hacer nada
  }

  eliminar(): void {
    this.dialogRef.close(true); // Cerrar el diálogo y confirmar la eliminación del producto
  }
}
