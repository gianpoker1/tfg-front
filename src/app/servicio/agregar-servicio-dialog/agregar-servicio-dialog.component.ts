import { Component } from '@angular/core';
import { Servicio } from '../../models/servicio.model';
import { MatDialogRef } from '@angular/material/dialog';
import { ServicioService } from '../../services/servicio.service';
import { Cliente } from '../../models/cliente.model';
import { ClienteService } from '../../services/cliente.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCliente } from 'src/app/models/user-cliente';
import { TrabajadorService } from 'src/app/services/trabajador.service';

@Component({
  selector: 'app-agregar-servicio-dialog',
  templateUrl: './agregar-servicio-dialog.component.html',
  styleUrls: ['./agregar-servicio-dialog.component.css']
})
export class AgregarServicioDialogComponent {
  nuevoServicioForm!: FormGroup;
  idTrabajador!: number;
  clientes: Cliente[] = [];
  userClientes: UserCliente[]=[];

  constructor(
    public dialogRef: MatDialogRef<AgregarServicioDialogComponent>,
    private formBuilder: FormBuilder,
    private servicioService: ServicioService,
    private clienteService: ClienteService,
    private authService: AuthService,
    private trabajadorService: TrabajadorService
  ) {}

  ngOnInit(): void {
    //asignar el id trabajador
    const idTrabajador = this.authService.getTrabajadorId();

    if(idTrabajador){
      this.trabajadorService.obtenerTrabajadorPorIdUsuario(idTrabajador).subscribe(trabajador => {
        this.idTrabajador = trabajador.idTrabajador;
      });

    }
    this.nuevoServicioForm = this.formBuilder.group({
      idCliente: ['',Validators.required],
      fechaInicio: [new Date(), Validators.required],
      fechaEntrega: [new Date(),Validators.required],
      subtotal: ['',Validators.required],
      formaDePago: ['',Validators.required],
      notas: ['',Validators.required],
      nombre: ['',Validators.required],
      entregado: [''],
      idTrabajador: [this.idTrabajador]
    });
    this.obtenerClientes();
  }

  obtenerClientes(): void {
    this.clienteService.obtenerClientes().subscribe(clientes => {
      this.clientes = clientes;
      this.clientes.forEach(cliente => {
        this.clienteService.obtenerClientePorId(cliente.idCliente).subscribe(userCliente => {
          this.userClientes.push(userCliente);
        });
      });
    });
  }

  agregarServicio(): void {
   if(this.nuevoServicioForm.valid){
    const nuevoServicio: Servicio = {
      idServicio: 0,
      idCliente: this.nuevoServicioForm.get('idCliente')?.value,
      fechaInicio: this.nuevoServicioForm.get('fechaInicio')?.value,
      fechaEntrega: this.nuevoServicioForm.get('fechaEntrega')?.value,
      entregado: this.nuevoServicioForm.get('entregado')?.value,
      subtotal: this.nuevoServicioForm.get('subtotal')?.value,
      formaDePago: this.nuevoServicioForm.get('formaDePago')?.value,
      nombre: this.nuevoServicioForm.get('nombre')?.value,
      notas: this.nuevoServicioForm.get('notas')?.value,
      idTrabajador: this.idTrabajador
    };

    this.servicioService.agregarServicio(nuevoServicio).subscribe(() =>{
      console.log('Servicio agregado');
      }, error => {
        console.log('Error al crear Servicio',error);
      });
      this.dialogRef.close(true);
    }
    
  }

  cerrarDialog(): void {
    this.dialogRef.close(false); // Cerrar el diálogo y enviar false al componente padre
  }
}
