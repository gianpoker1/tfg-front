import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ciudad } from '../../models/ciudad.model';
import { Pais } from '../../models/pais.model';
import { Provincia } from '../../models/provincia.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CiudadService } from '../../services/ciudad.service';
import { ProvinciaService } from '../../services/provincia.service';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-editar-ciudad-dialog',
  templateUrl: './editar-ciudad-dialog.component.html',
  styleUrls: ['./editar-ciudad-dialog.component.css']
})
export class EditarCiudadDialogComponent implements OnInit{

  ciudadForm!: FormGroup;
  ciudad!: Ciudad;
  paises!: Pais[];
  provincias!: Provincia[];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditarCiudadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private ciudadService: CiudadService,
    private provinciaService: ProvinciaService,
    private paisService: PaisService
    ) {
    this.ciudadForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      idProvincia: ['', Validators.required],
      idPais: ['', Validators.required]
    });
    }

  ngOnInit(): void {
    this.paisService.obtenerPaises().subscribe((paises: Pais[]) => {
      this.paises = paises;
    });

    this.provinciaService.obtenerProvincias().subscribe((provincias: Provincia[]) => {
      this.provincias = provincias;
    });

    this.ciudadService.obtenerCiudadPorId(this.data).subscribe((ciudad: Ciudad) => {
      this.ciudad = ciudad;
      this.ciudadForm.patchValue(ciudad);
    });
  
  }

  actualizarCiudad(): void {
    const ciudad: Ciudad = this.ciudadForm.value;
    ciudad.idCiudad = this.data;

    this.ciudadService.actualizarCiudad(ciudad.idCiudad, ciudad).subscribe(()=>{
      this.dialogRef.close(true);
    });
  }

  cancelar(){
    this.dialogRef.close(false);
  }

  



}
