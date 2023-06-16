import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Proovedor } from '../../models/proovedor.model';
import { ProovedorService } from '../../services/proovedor.service';
import { Pais } from '../../models/pais.model';
import { PaisService } from '../../services/pais.service';
import { Ciudad } from '../../models/ciudad.model';
import { Provincia } from '../../models/provincia.model';
import { CiudadService } from '../../services/ciudad.service';
import { ProvinciaService } from '../../services/provincia.service';


@Component({
  selector: 'app-editar-proveedor-dialog',
  templateUrl: './editar-proveedor-dialog.component.html',
  styleUrls: ['./editar-proveedor-dialog.component.css']
})
export class EditarProveedorDialogComponent implements OnInit {

  proveedorForm: FormGroup;
  paises: Pais[] = [];
  ciudades: Ciudad[] = [];
  provincias: Provincia[] = [];

  constructor(
    public dialogRef: MatDialogRef<EditarProveedorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private formBuilder: FormBuilder,
    private proveedorService: ProovedorService,
    private paisService: PaisService,
    private ciudadService: CiudadService,
    private provinciaService: ProvinciaService
  ) {
    this.proveedorForm = this.formBuilder.group({
      nif: ['', Validators.required],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      idPais: ['', Validators.required],
      idCiudad: ['', Validators.required],
      idProvincia: ['', Validators.required],
      email: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.proveedorService.obtenerProovedorPorId(this.data).subscribe((proveedor: Proovedor) => {
      this.proveedorForm.patchValue(proveedor);
    });
    this.paisService.obtenerPaises().subscribe((paises: Pais[]) => {
      this.paises = paises;
    });

    this.ciudadService.obtenerCiudades().subscribe((ciudades: Ciudad[]) => {
      this.ciudades = ciudades;
    });
    this.provinciaService.obtenerProvincias().subscribe((provincias: Provincia[]) => {
      this.provincias = provincias;
    });

  }

  guardarCambios(): void {
    const proveedor: Proovedor = this.proveedorForm.value;
    proveedor.idProovedor = this.data;

    this.proveedorService.actualizarProovedor(proveedor.idProovedor, proveedor).subscribe(() => {
      this.dialogRef.close(true); // Cerrar el diálogo y actualizar la lista de proveedores
    });
  }

  cancelar(): void {
    this.dialogRef.close(false); // Cerrar el diálogo sin hacer nada
  }

}
