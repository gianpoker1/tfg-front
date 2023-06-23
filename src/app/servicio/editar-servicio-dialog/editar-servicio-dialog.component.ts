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
import { UserCliente } from 'src/app/models/user-cliente';
import { UserTrabajador } from 'src/app/models/user-trabajador';

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
  servicio!: Servicio;
  userCliente!: UserCliente;
  userTrabajador!: UserTrabajador;
  nombreUsuario!: string;
  idCliente!: number;


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
    this.servicioService.obtenerServicioPorId(this.data).subscribe(servicio => {
      this.servicio = servicio;

      this.clienteService.obtenerClientePorId(servicio.idCliente).subscribe(userCliente => {
        this.userCliente = userCliente;
        this.servicioForm.get('idCliente')?.setValue(userCliente.usuario.nombre);
        
      });

      this.trabajadorService.obtenerTrabajadorPorId(servicio.idTrabajador).subscribe(userTrabajador => {
        this.userTrabajador = userTrabajador;
        this.servicioForm.get('idTrabajador')?.setValue(userTrabajador.usuario.nombre);
      });

      this.servicioForm.patchValue({
        fechaInicio: servicio.fechaInicio,
        fechaEntrega: servicio.fechaEntrega,
        subtotal: servicio.subtotal,
        formaDePago: servicio.formaDePago,
        notas: servicio.notas,
        nombre: servicio.nombre,
        entregado: servicio.entregado,
        idTrabajador: servicio.idTrabajador
      });

      


    });

    this.getClients();
    this.getTrabajadores();
    
    //filtrar clientes y trabajadores
    this.usuarioService.findAll().subscribe(usuarios => {
      
      this.usuarios = usuarios.filter(usuario => this.esCliente(usuario));
      this.usuarioTrabajador = usuarios.filter(usuario => this.esTrabajador(usuario));
      console.log('USUARIOS CLIENTES: ', this.usuarios);
    });

    //filtrar trabajadores
  
    
  }


  guardarCambios(): void {
    const formValue = this.servicioForm.value;
    const nombreUsuario = formValue.idCliente;
    const nombreTrabajador = formValue.idTrabajador;
    this.servicio.idCliente = this.buscarNombreCliente(nombreUsuario);
    this.servicio.fechaInicio = formValue.fechaInicio;
    this.servicio.fechaEntrega = formValue.fechaEntrega;
    this.servicio.subtotal = formValue.subtotal;
    this.servicio.formaDePago = formValue.formaDePago;
    this.servicio.notas = formValue.notas;
    this.servicio.nombre = formValue.nombre;
    this.servicio.entregado = formValue.entregado;
    this.servicio.idTrabajador = this.buscarNombreTrabajador(nombreTrabajador);

    const servicio: Servicio = {
      idServicio: this.servicio.idServicio,
      idCliente: this.servicio.idCliente,
      fechaInicio: this.servicio.fechaInicio,
      fechaEntrega: this.servicio.fechaEntrega,
      subtotal: this.servicio.subtotal,
      formaDePago: this.servicio.formaDePago,
      notas: this.servicio.notas,
      nombre: this.servicio.nombre,
      entregado: this.servicio.entregado,
      idTrabajador: this.servicio.idTrabajador
    };

    this.servicioService.actualizarServicio(servicio.idServicio, servicio).subscribe(() => {
      this.dialogRef.close(true); // Cerrar el diálogo y actualizar la lista de servicios
    });
  }

  esCliente(usuario: Usuario): boolean{
    return this.clientes.some(cliente => cliente.idUsuario === usuario.id);
  }

  esTrabajador(usuario: Usuario): boolean{
    return this.trabajadores.some(trabajador => trabajador.idUsuario === usuario.id);
  }

  buscarNombreCliente(nombre: string): number{
    const usuarioEncontrado = this.usuarios.find(usuario => usuario.nombre === nombre);
    
    const clienteAsociado = this.clientes.find(cliente => cliente.idUsuario === usuarioEncontrado?.id);
    return clienteAsociado ? clienteAsociado.idCliente : 0;
  }

  buscarNombreTrabajador(nombre: string): number{
    const usuarioEncontrado = this.usuarios.find(usuario => usuario.nombre === nombre);
    
    const trabajadorAsociado = this.trabajadores.find(trabajador => trabajador.idUsuario === usuarioEncontrado?.id);
    return trabajadorAsociado ? trabajadorAsociado.idTrabajador : 0;
  }



  getTrabajadores(): void{
    this.trabajadorService.obtenerTrabajadores().subscribe(trabajadores => {
      this.trabajadores = trabajadores;
    });
  }

  getClients(): void{
    this.clienteService.obtenerClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  cancelar(): void {
    this.dialogRef.close(false); // Cerrar el diálogo sin hacer nada
  }

}
