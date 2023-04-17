import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-eliminar-categoria-dialog',
  templateUrl: './eliminar-categoria-dialog.component.html',
  styleUrls: ['./eliminar-categoria-dialog.component.css']
})
export class EliminarCategoriaDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EliminarCategoriaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public categoria: any
  ) {}

  eliminar(): void {
    // Aquí se puede llamar a la API para eliminar la categoría
    this.dialogRef.close(true); // Cerrar el diálogo y actualizar la lista de categorías
  }
}
