import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ClienteService } from '../services/cliente.service';
import { TrabajadorService } from '../services/trabajador.service';
import { DetalleServicioService } from '../services/detalle-servicio.service';
import { ServicioService } from '../services/servicio.service';
import { Cliente } from '../models/cliente.model';
import { Trabajador } from '../models/trabajador.model';
import { DetalleServicio } from '../models/detalle-servicio.model';
import { Servicio } from '../models/servicio.model';

@Component({
  selector: 'app-editar-servicio-dialog',
  templateUrl: './editar-servicio-dialog.component.html',
  styleUrls: ['./editar-servicio-dialog.component.css']
})
export class EditarServicioDialogComponent implements OnInit {

  servicioForm: FormGroup;
  clientes: Cliente[] = [];
  trabajadores: Trabajador[] = [];
  detallesServicio: DetalleServicio[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditarServicioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private trabajadorService: TrabajadorService,
    private detalleServicioService: DetalleServicioService,
    private servicioService: ServicioService
  ) {
    this.servicioForm = this.formBuilder.group({
      idCliente: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaEntrega: ['', Validators.required],
      entregado: ['', Validators.required],
      idDetalleServicio: ['', Validators.required],
      idTrabajador: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.clienteService.obtenerClientes().subscribe((clientes: Cliente[]) => {
      this.clientes = clientes;
    });

    this.trabajadorService.obtenerTrabajadores().subscribe((trabajadores: Trabajador[]) => {
      this.trabajadores = trabajadores;
    });

    this.detalleServicioService.obtenerDetallesServicio().subscribe((detallesServicio: DetalleServicio[]) => {
      this.detallesServicio = detallesServicio;
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
