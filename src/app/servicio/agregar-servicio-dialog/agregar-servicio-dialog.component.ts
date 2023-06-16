import { Component } from '@angular/core';
import { Servicio } from '../../models/servicio.model';
import { MatDialogRef } from '@angular/material/dialog';
import { ServicioService } from '../../services/servicio.service';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-agregar-servicio-dialog',
  templateUrl: './agregar-servicio-dialog.component.html',
  styleUrls: ['./agregar-servicio-dialog.component.css']
})
export class AgregarServicioDialogComponent {
  nuevoServicio: Servicio = {
    idServicio: 0,
    idCliente:0,
    fechaInicio: new Date(),
    fechaEntrega: new Date(),
    subtotal:0,
    formaDePago:'',
    notas:'',
    nombre:'',
    entregado: false,
    idTrabajador: 0
  };

  clientes: Cliente[] = [];
  usuarios : Usuario[] = [];

  constructor(
    public dialogRef: MatDialogRef<AgregarServicioDialogComponent>,
    private servicioService: ServicioService,
    private clienteService: ClienteService,
    private usuarioService: UsuarioService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //asignar el id trabajador
    const idTrabajador = this.authService.getTrabajadorId();
    if(idTrabajador){
      this.nuevoServicio.idTrabajador = idTrabajador;
    }
    this.obtenerClientes();
  }

  obtenerClientes(): void {
    this.clienteService.obtenerClientes().subscribe(clientes => {
      this.clientes = clientes;
      this.clientes.forEach(cliente => {
        this.usuarioService.findById(cliente.idUsuario).subscribe(usuario => {
          this.usuarios.push(usuario);
          
        });
      });
    });
  }

  agregarServicio(): void {
    this.servicioService.agregarServicio(this.nuevoServicio).subscribe(
      (servicio: Servicio) => {
        console.log('Servicio agregado:', servicio);
        this.dialogRef.close(true); // Cerrar el diálogo y enviar true al componente padre
      },
      error => {
        console.error('Error al agregar el servicio:', error);
      }
    );
    
  }

  cerrarDialog(): void {
    this.dialogRef.close(false); // Cerrar el diálogo y enviar false al componente padre
  }
}
