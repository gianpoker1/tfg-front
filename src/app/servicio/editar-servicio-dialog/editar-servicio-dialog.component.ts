import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ClienteService } from '../../services/cliente.service';
import { TrabajadorService } from '../../services/trabajador.service';
import { ServicioService } from '../../services/servicio.service';
import { Cliente } from '../../models/cliente.model';
import { Trabajador } from '../../models/trabajador.model';
import { Servicio } from '../../models/servicio.model';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-editar-servicio-dialog',
  templateUrl: './editar-servicio-dialog.component.html',
  styleUrls: ['./editar-servicio-dialog.component.css']
})
export class EditarServicioDialogComponent implements OnInit {

  servicioForm: FormGroup;
  clientes: Cliente[] = [];
  trabajadores: Trabajador[] = [];
  usuarios: Usuario[] = [];
  usuarioTrabajador: Usuario[] = [];


  constructor(
    public dialogRef: MatDialogRef<EditarServicioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private trabajadorService: TrabajadorService,
    private servicioService: ServicioService,
    private usuarioService: UsuarioService
  ) {
    this.servicioForm = this.formBuilder.group({
      idCliente: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaEntrega: ['', Validators.required],
      subtotal: ['', Validators.required],
      formaDePago: ['', Validators.required],
      notas: ['', Validators.required],
      nombre: ['', Validators.required],
      entregado: ['', Validators.required],
      idTrabajador: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.clienteService.obtenerClientes().subscribe(clientes => {
      this.clientes = clientes;
      this.clientes.forEach(cliente => {
        this.usuarioService.findById(cliente.idCliente).subscribe(
          usuario => {
            this.usuarios.push(usuario);
            if(usuario.id == this.data){
              this.servicioForm.patchValue({idCliente: cliente.idCliente});
            }
          });
      });
    });

    this.trabajadorService.obtenerTrabajadores().subscribe(trabajadores => {
      this.trabajadores = trabajadores;
      this.trabajadores.forEach(trabajador => {
        this.usuarioService.findById(trabajador.idTrabajador).subscribe(
          usuario =>{
            this.usuarioTrabajador.push(usuario);
            if(usuario.id == this.data){
              this.servicioForm.patchValue({idTrabajador: trabajador.idTrabajador});
            }

          });
      });
    });

    this.servicioService.obtenerServicioPorId(this.data).subscribe((servicio: Servicio) => {
      this.servicioForm.patchValue(servicio);
    });
  }


  guardarCambios(): void {
    const servicio: Servicio = this.servicioForm.value;
    servicio.idServicio = this.data;

    this.servicioService.actualizarServicio(servicio.idServicio, servicio).subscribe(() => {
      this.dialogRef.close(true); // Cerrar el diálogo y actualizar la lista de servicios
    });
  }

  cancelar(): void {
    this.dialogRef.close(false); // Cerrar el diálogo sin hacer nada
  }

}
