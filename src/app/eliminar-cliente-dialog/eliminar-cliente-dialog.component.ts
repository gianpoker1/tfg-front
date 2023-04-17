import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente.model';

@Component({
  selector: 'app-eliminar-cliente-dialog',
  templateUrl: './eliminar-cliente-dialog.component.html',
  styleUrls: ['./eliminar-cliente-dialog.component.css']
})
export class EliminarClienteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EliminarClienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public cliente: Cliente,
    private clienteService: ClienteService) { }

  eliminarCliente(): void {
    this.clienteService.eliminarCliente(this.cliente.idCliente).subscribe(() => {
      this.dialogRef.close(true); // Cerrar el diálogo y actualizar la lista de clientes
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

}
