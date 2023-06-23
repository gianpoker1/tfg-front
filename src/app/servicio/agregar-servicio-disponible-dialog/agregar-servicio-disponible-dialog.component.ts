import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ServicioDisponible } from 'src/app/models/ServicioDisponible';
import { ServicioDisponibleService } from 'src/app/services/servicio-disponible.service';

@Component({
  selector: 'app-agregar-servicio-disponible-dialog',
  templateUrl: './agregar-servicio-disponible-dialog.component.html',
  styleUrls: ['./agregar-servicio-disponible-dialog.component.css']
})
export class AgregarServicioDisponibleDialogComponent {

  nuevoServicioDisponibleForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AgregarServicioDisponibleDialogComponent>,
    private formBuilder: FormBuilder,
    private servicioDisponibleService: ServicioDisponibleService
  ) { }

  ngOnInit(): void {
    this.nuevoServicioDisponibleForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      duracion: ['', Validators.required]
    });
  }

  agregarServicioDisponible(): void{
    console.log('SERVICIO JSON: ', this.nuevoServicioDisponibleForm.value);
    if(this.nuevoServicioDisponibleForm.valid){
      const nuevoServicioDisponible: ServicioDisponible ={
        idServicioDisponible: 0,
        nombre: this.nuevoServicioDisponibleForm.get('nombre')?.value,
        descripcion: this.nuevoServicioDisponibleForm.get('descripcion')?.value,
        precio: this.nuevoServicioDisponibleForm.get('precio')?.value,
        duracion: this.nuevoServicioDisponibleForm.get('duracion')?.value
      }

      this.servicioDisponibleService.agregarServicioDisponible(nuevoServicioDisponible).subscribe(() => {
        console.log("Servicio disponible agregado");
      }, error => {
        console.error('Error al crear Servicio', error);
      });
      this.dialogRef.close(true);
    }
  }

  cerrarDialog(): void{
    this.dialogRef.close(false);
  }

}
