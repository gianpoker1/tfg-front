import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Ciudad } from 'src/app/models/ciudad.model';
import { Pais } from 'src/app/models/pais.model';
import { Proovedor } from 'src/app/models/proovedor.model';
import { Provincia } from 'src/app/models/provincia.model';
import { CiudadService } from 'src/app/services/ciudad.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProovedorService } from 'src/app/services/proovedor.service';
import { ProvinciaService } from 'src/app/services/provincia.service';

@Component({
  selector: 'app-agregar-proveedor-dialog',
  templateUrl: './agregar-proveedor-dialog.component.html',
  styleUrls: ['./agregar-proveedor-dialog.component.css']
})
export class AgregarProveedorDialogComponent {

  nuevoProveedorForm!: FormGroup;
  paises!: Pais[];
  ciudades!: Ciudad[];
  provincias!: Provincia[];


  constructor(
    protected dialogRef: MatDialogRef<AgregarProveedorDialogComponent>,
    private formBuilder: FormBuilder,
    private proveedorService: ProovedorService,
    private paisService: PaisService,
    private ciudadService: CiudadService,
    private provinciaService: ProvinciaService
  ) { }

  ngOnInit(): void {
    this.nuevoProveedorForm = this.formBuilder.group({
      nif: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      idPais: ['', Validators.required],
      idCiudad: ['', Validators.required],
      idProvincia: ['', Validators.required],
      email: ['', Validators.required]
    });
    this.getPaises();
    this.getProvincias();
    this.getCiudades();
  }

  agregarProveedor() : void{
    if(this.nuevoProveedorForm.valid){
      const nuevoProveedor: Proovedor = {
        idProovedor: 0,
        nif: this.nuevoProveedorForm.get('nif')?.value,
        nombre: this.nuevoProveedorForm.get('nombre')?.value,
        direccion: this.nuevoProveedorForm.get('direccion')?.value,
        telefono: this.nuevoProveedorForm.get('telefono')?.value,
        idPais: this.nuevoProveedorForm.get('idPais')?.value,
        idCiudad: this.nuevoProveedorForm.get('idCiudad')?.value,
        idProvincia: this.nuevoProveedorForm.get('idProvincia')?.value,
        email: this.nuevoProveedorForm.get('email')?.value
    };

    this.proveedorService.agregarProovedor(nuevoProveedor).subscribe(
      () => {
        console.log('Proveedor agregado');
      },error => {
        console.log('Error al guardar proveedor', error);
      });
      this.dialogRef.close(true);
    }
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

  getPaises(): void {
    this.paisService.obtenerPaises().subscribe(paises => {
      this.paises = paises;
    });
  }

  getCiudades(): void {
    this.ciudadService.obtenerCiudades().subscribe(ciudades => {
      this.ciudades = ciudades;
    });
  }

  getProvincias(): void {
    this.provinciaService.obtenerProvincias().subscribe(provincias => {
      this.provincias = provincias;
    });
  }


}
