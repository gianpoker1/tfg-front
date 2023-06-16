import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoService } from 'src/app/services/producto.service';


@Component({
  selector: 'app-eliminar-producto-dialog',
  templateUrl: './eliminar-producto-dialog.component.html',
  styleUrls: ['./eliminar-producto-dialog.component.css']
})
export class EliminarProductoDialogComponent implements OnInit{

  productoId!: number;

  constructor(
    public dialogRef: MatDialogRef<EliminarProductoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productoService: ProductoService
  ) {}
  ngOnInit(): void {
    this.productoId = this.data;
  }

  cancelar(): void {
    this.dialogRef.close(false); // Cerrar el diálogo sin hacer nada
  }

  eliminar(): void {
    this.productoService.eliminarProducto(this.productoId).subscribe(
      () => {
        console.log('Producto eliminado con exito');
      }, error => {
        console.log('Error al eliminar producto', error);
      }
    );
    this.dialogRef.close(true); // Cerrar el diálogo y confirmar la eliminación del producto
  }
}
