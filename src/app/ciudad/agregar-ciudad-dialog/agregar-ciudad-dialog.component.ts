import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ciudad } from '../../models/ciudad.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaisService } from '../../services/pais.service';
import { ProvinciaService } from '../../services/provincia.service';
import { CiudadService } from '../../services/ciudad.service';
import { Pais } from '../../models/pais.model';
import { Provincia } from '../../models/provincia.model';

@Component({
  selector: 'app-agregar-ciudad-dialog',
  templateUrl: './agregar-ciudad-dialog.component.html',
  styleUrls: ['./agregar-ciudad-dialog.component.css']
})
export class AgregarCiudadDialogComponent {

  nuevaCiudadForm!: FormGroup;
  ciudad!: Ciudad;
  paises!: Pais[];
  provincias!: Provincia[];
  
  constructor(
    public dialogRef: MatDialogRef<AgregarCiudadDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private paisService: PaisService,
    private provinciaService: ProvinciaService,
    private ciudadService: CiudadService
  ) { }


  ngOnInit(): void {
    this.nuevaCiudadForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      idProvincia: ['', Validators.required],
      idPais: ['', Validators.required]
    });
    this.paisService.obtenerPaises().subscribe((paises : Pais[]) => {
      this.paises = paises;
    });
    this.provinciaService.obtenerProvincias().subscribe((provincias: Provincia[]) => {
      this.provincias = provincias;
    });
  }

  agregarCiudad(): void {
    if(this.nuevaCiudadForm.valid){
      const nuevaCiudad: Ciudad = {
        idCiudad: 0,
        nombre: this.nuevaCiudadForm.get('nombre')?.value,
        idProvincia: +this.nuevaCiudadForm.get('idProvincia')?.value,
        idPais: +this.nuevaCiudadForm.get('idPais')?.value
      };
      this.ciudadService.agregarCiudad(nuevaCiudad).subscribe(() => {
        console.log('Ciudad agregada');
      }, error => {
        console.log('Error al guardar la ciudad', error);
      });
      this.dialogRef.close(true);
    }
  }

  cancelar(){
    this.dialogRef.close(false);
  }

}
