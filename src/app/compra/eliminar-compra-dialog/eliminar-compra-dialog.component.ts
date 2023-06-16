import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompraService } from '../../services/compra.service';

@Component({
  selector: 'app-eliminar-compra-dialog',
  templateUrl: './eliminar-compra-dialog.component.html',
  styleUrls: ['./eliminar-compra-dialog.component.css']
})
export class EliminarCompraDialogComponent implements OnInit{

  idCompra!: number;

  constructor(
    protected dialogRef: MatDialogRef<EliminarCompraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private compraService: CompraService
  ) { }

  ngOnInit(): void {
    this.compraService.obtenerCompraPorId(this.data).subscribe(compra => {
      this.idCompra = compra.idCompra;
    });
  }

  eliminarCompra(): void{
    
    this.compraService.eliminarCompra(this.idCompra).subscribe(() => {
      console.log('Compra eliminada');
      this.dialogRef.close(true);
    }
    , error => {
      console.error('Error al eliminar la compra', error);
    });
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
