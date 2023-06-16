import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-eliminar-cliente-dialog',
  templateUrl: './eliminar-cliente-dialog.component.html',
  styleUrls: ['./eliminar-cliente-dialog.component.css']
})
export class EliminarClienteDialogComponent implements OnInit{

  idCliente!: number;
  nombreUsuario!: string;

  constructor(
    public dialogRef: MatDialogRef<EliminarClienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private clienteService: ClienteService
    ) { }

  ngOnInit(): void {
    this.clienteService.obtenerClientePorId(this.data).subscribe(userCliente => {
      this.idCliente = userCliente.cliente.idCliente;
      this.nombreUsuario = userCliente.usuario.userName;
    });

    }

  eliminarCliente(): void {
    this.clienteService.eliminarCliente(this.idCliente).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

}
