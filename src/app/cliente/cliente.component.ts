import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { EditarClienteDialogComponent } from '../editar-cliente-dialog/editar-cliente-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EliminarClienteDialogComponent } from '../eliminar-cliente-dialog/eliminar-cliente-dialog.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes!: Cliente[];


  constructor(private clienteService: ClienteService,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.getClientes();
  }

  getClientes() {
    this.clienteService.obtenerClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  editarCliente(idCliente: number): void {
    const dialogRef = this.dialog.open(EditarClienteDialogComponent, {
      width: '250px',
      data: { idCliente }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Actualizar la lista de clientes si se modificó alguno
      if (result) {
        this.getClientes();
      }
    });
  }

  eliminarCliente(idCliente: number) {
    const dialogRef = this.dialog.open(EliminarClienteDialogComponent, {
      width: '400px',
      data: this.clientes.find(c => c.idCliente === idCliente)
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Actualizar la lista de clientes después de eliminar uno
        this.getClientes();
      }
    });
  }

}