import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServicioDisponible } from 'src/app/models/ServicioDisponible';
import { ServicioDisponibleService } from 'src/app/services/servicio-disponible.service';

@Component({
  selector: 'app-editar-servicio-disponible-dialog',
  templateUrl: './editar-servicio-disponible-dialog.component.html',
  styleUrls: ['./editar-servicio-disponible-dialog.component.css']
})
export class EditarServicioDisponibleDialogComponent implements OnInit{

  servicioDisponibleForm!: FormGroup;
  servicioDisponible!: ServicioDisponible;


  constructor(
    public dialogRef: MatDialogRef<EditarServicioDisponibleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private formBuilder: FormBuilder,
    private servicioDisponibleService: ServicioDisponibleService
  ) { 
    this.servicioDisponibleForm = this.formBuilder.group({
      idServicioDisponible: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      duracion: ['', Validators.required]
    });
      
  }


  ngOnInit(): void {
    this.servicioDisponibleService.obtenerServicioDisponiblePorId(this.data).subscribe(servicioDisponible =>{
      this.servicioDisponible = servicioDisponible;

      this.servicioDisponibleForm.patchValue({
        idServicioDisponible: this.servicioDisponible.idServicioDisponible,
        nombre: this.servicioDisponible.nombre,
        descripcion: this.servicioDisponible.descripcion,
        precio: this.servicioDisponible.precio,
        duracion: this.servicioDisponible.duracion
      });
    });

  }

  guardarServicioDisponible(): void{
    if(this.servicioDisponibleForm.valid){
      const formValue = this.servicioDisponibleForm.value;
      this.servicioDisponible.nombre = formValue.nombre;
      this.servicioDisponible.descripcion = formValue.descripcion;
      this.servicioDisponible.precio = formValue.precio;
      this.servicioDisponible.duracion = formValue.duracion;

      this.servicioDisponibleService.actualizarServicioDisponible(this.servicioDisponible.idServicioDisponible, this.servicioDisponible)
      .subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

  cancelar(): void{
    this.dialogRef.close(false);
  }
}
