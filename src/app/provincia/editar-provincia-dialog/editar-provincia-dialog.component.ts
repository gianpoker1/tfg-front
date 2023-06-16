import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pais } from '../../models/pais.model';
import { Provincia } from '../../models/provincia.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaisService } from '../../services/pais.service';
import { ProvinciaService } from '../../services/provincia.service';

@Component({
  selector: 'app-editar-provincia-dialog',
  templateUrl: './editar-provincia-dialog.component.html',
  styleUrls: ['./editar-provincia-dialog.component.css']
})
export class EditarProvinciaDialogComponent implements OnInit{

  provinciaForm!: FormGroup;
  paises!: Pais[];
  provincia!: Provincia;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditarProvinciaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private paisService: PaisService,
    private provinciaService: ProvinciaService
    ) {
      this.provinciaForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        idPais: ['', Validators.required]
      });
    }


  ngOnInit(): void {
    this.paisService.obtenerPaises().subscribe((paises: Pais[]) => {
      this.paises = paises;
    });

    this.provinciaService.obtenerProvinciaPorId(this.data).subscribe((provincia: Provincia) => {
      this.provincia = provincia;
      this.provinciaForm.patchValue(provincia);
    });
  
  }

  actualizarProvincia(): void {
    const provincia: Provincia = this.provinciaForm.value;
    provincia.idProvincia = this.data;

    this.provinciaService.actualizarProvincia(provincia.idProvincia, provincia).subscribe(()=>{
      this.dialogRef.close(true);
    });
  }

  cancelar(){
    this.dialogRef.close(false);
  }
}
