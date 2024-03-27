import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServicioDisponible } from 'src/app/models/ServicioDisponible';
import { ServicioSolicitado } from 'src/app/models/ServicioSolicitado';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { ServicioDisponibleService } from 'src/app/services/servicio-disponible.service';
import { ServicioSolicitadoService } from 'src/app/services/servicio-solicitado.service';

@Component({
  selector: 'app-solicitar-servicio-disponible-dialog',
  templateUrl: './solicitar-servicio-disponible-dialog.component.html',
  styleUrls: ['./solicitar-servicio-disponible-dialog.component.css']
})
export class SolicitarServicioDisponibleDialogComponent implements OnInit{

  nuevoServicioSolicitadoForm! : FormGroup;
  servicioDisponible!: ServicioDisponible;
  servicioSolicitado: ServicioSolicitado = new ServicioSolicitado();
  idCliente!: number;


  constructor(
    public dialogRef: MatDialogRef<SolicitarServicioDisponibleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private servicioDisponibleService: ServicioDisponibleService,
    private servicioSoliciadoService: ServicioSolicitadoService,
    private clienteService: ClienteService
  ) {
    this.nuevoServicioSolicitadoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      notasAdicionales: ['', Validators.required],
      precio: ['', Validators.required],
      duracion: ['', Validators.required],
      fechaSolicitud: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.servicioDisponibleService.obtenerServicioDisponiblePorId(this.data).subscribe(servicioDisponible =>{
      this.servicioDisponible = servicioDisponible;

        this.nuevoServicioSolicitadoForm.patchValue({
          nombre: this.servicioDisponible.nombre,
          descripcion: this.servicioDisponible.descripcion,
          precio: this.servicioDisponible.precio,
          duracion: this.servicioDisponible.duracion,
          fechaSolicitud: new Date(),
        });
      });
  }

  guardarServicioSolicitado(): void{
    console.log('FORM: ',this.nuevoServicioSolicitadoForm.valid);
    if(this.nuevoServicioSolicitadoForm.valid){
      const formValue = this.nuevoServicioSolicitadoForm.value;
      const idUsuario = this.authService.getTrabajadorId();
      this.clienteService.obtenerClientePorIdUsuario(idUsuario!).subscribe(cliente =>{
        this.idCliente = cliente.idCliente;
        console.log('ID CLIENTE: ',this.idCliente);
        this.servicioSolicitado.idCliente = this.idCliente;
        this.servicioSolicitado.idServicioDisponible = this.servicioDisponible.idServicioDisponible;
        this.servicioSolicitado.fecha = formValue.fechaSolicitud;
        this.servicioSolicitado.notasAdicionales = formValue.notasAdicionales;
        this.servicioSolicitado.estado = 'Solicitado';
        this.servicioSolicitado.precio = formValue.precio;
        this.servicioSolicitado.duracion = formValue.duracion;


        this.servicioSoliciadoService.agregarServicioSolicitado(this.servicioSolicitado)
          .subscribe(
          () => {
            console.log('Servicio solicitado correctamente');
          }, error => console.log('Error al solicitar servicio. ',error));
          this.dialogRef.close(true);
      });
    }

  }

  cancelar(): void{
    this.dialogRef.close(false);
  }

  obtenerClienteId(idUsuario: number | undefined): number{
    this.clienteService.obtenerClientePorIdUsuario(idUsuario!).subscribe(cliente =>{
      this.idCliente = cliente.idCliente;
    });
    return this.idCliente;
  }
}
