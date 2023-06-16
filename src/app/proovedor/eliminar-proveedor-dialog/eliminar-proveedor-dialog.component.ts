import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProovedorService } from '../../services/proovedor.service';

@Component({
  selector: 'app-eliminar-proveedor-dialog',
  templateUrl: './eliminar-proveedor-dialog.component.html',
  styleUrls: ['./eliminar-proveedor-dialog.component.css']
})
export class EliminarProveedorDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EliminarProveedorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private proveedorService: ProovedorService
  ) { }

  ngOnInit(): void {
  }

  eliminarProveedor(): void {
    this.proveedorService.eliminarProovedor(this.data).subscribe(() => {
      this.dialogRef.close(true); // Cerrar el diálogo y actualizar la lista de proveedores
    });
  }

  cancelar(): void {
    this.dialogRef.close(false); // Cerrar el diálogo sin hacer nada
  }

}
