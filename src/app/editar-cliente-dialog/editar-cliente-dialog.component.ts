import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cliente } from '../models/cliente.model';
import { ClienteService } from '../services/cliente.service';

@Component({
  providers: [MatDialogRef],
  selector: 'app-editar-cliente-dialog',
  templateUrl: './editar-cliente-dialog.component.html',
  styleUrls: ['./editar-cliente-dialog.component.css']
})
export class EditarClienteDialogComponent {

  cliente: Cliente = new Cliente();

  constructor(
    protected dialogRef: MatDialogRef<EditarClienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clienteService: ClienteService
  ) {
    this.clienteService.obtenerClientePorId(data.idCliente).subscribe(cliente => {
      this.cliente = cliente;
    });
  }

  guardarCambios(): void {
    this.clienteService.actualizarCliente(this.cliente.idCliente,this.cliente).subscribe(() => {
      this.dialogRef.close(true); // Cerrar el diálogo y actualizar la lista de clientes
    });
  }

  cerrarDialog(): void {
    this.dialogRef.close(false); // Cerrar el diálogo sin actualizar la lista de clientes
  }

}
