import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServicioSolicitado } from 'src/app/models/ServicioSolicitado';
import { ServicioSolicitadoService } from 'src/app/services/servicio-solicitado.service';

@Component({
  selector: 'app-editar-servicio-solicitado-admin-dialog',
  templateUrl: './editar-servicio-solicitado-admin-dialog.component.html',
  styleUrls: ['./editar-servicio-solicitado-admin-dialog.component.css']
})
export class EditarServicioSolicitadoAdminDialogComponent implements OnInit{

  servicioSolicitadoForm!: FormGroup;
  servicioSolicitado!: ServicioSolicitado;

  constructor(
    public dialogRef: MatDialogRef<EditarServicioSolicitadoAdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private servicioSolicitadoService: ServicioSolicitadoService,
    private formBuilder: FormBuilder,
  ) { 
    this.servicioSolicitadoForm =this.formBuilder.group({
      estado:['', Validators.required],
      duracion:['', Validators.required],
      notasAdicionales:['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log('ID SERVICIO SOLICITADO: ', this.data);
    this.servicioSolicitadoService.obtenerServicioSolicitadoPorId(this.data)
    .subscribe(servicioSolicitado =>{
      this.servicioSolicitado = servicioSolicitado;
      this.servicioSolicitadoForm.patchValue({
        estado: this.servicioSolicitado.estado,
        duracion: this.servicioSolicitado.duracion,
        notasAdicionales: this.servicioSolicitado.notasAdicionales
      });
      
    });    
  }

  guardarCambios(): void{
    const formValue = this.servicioSolicitadoForm.value;
    this.servicioSolicitado.estado = formValue.estado;
    this.servicioSolicitado.duracion = formValue.duracion;
    this.servicioSolicitado.notasAdicionales = formValue.notasAdicionales;

    this.servicioSolicitadoService.actualizarServicioSolicitado(this.servicioSolicitado.idServicioSolicitado, this.servicioSolicitado)
    .subscribe(() =>{
      console.log('Servicio solicitado actualizado');
    }, error =>{
      console.log('Error al actualizar Servicio Solicitado. ', error);
    });
    this.dialogRef.close(true);
  }

  cancelar(): void {
    this.dialogRef.close(false); // Cerrar el diálogo sin hacer nada
  }

}
