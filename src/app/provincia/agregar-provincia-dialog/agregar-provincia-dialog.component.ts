import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Provincia } from '../../models/provincia.model';
import { Pais } from '../../models/pais.model';
import { PaisService } from '../../services/pais.service';
import { ProvinciaService } from '../../services/provincia.service';

@Component({
  selector: 'app-agregar-provincia-dialog',
  templateUrl: './agregar-provincia-dialog.component.html',
  styleUrls: ['./agregar-provincia-dialog.component.css']
})
export class AgregarProvinciaDialogComponent {

  nuevaProvinciaForm!: FormGroup;
  paises!: Pais[];

  constructor(
    public dialogRef: MatDialogRef<AgregarProvinciaDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject (MAT_DIALOG_DATA) public data: any,
    private paisService: PaisService,
    private provinciaService: ProvinciaService
  ) { }

  ngOnInit(): void {
    this.nuevaProvinciaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      idPais: ['', Validators.required]
    });
    this.obtenerPaises();
  }

  agregarProvincia(): void {
    if (this.nuevaProvinciaForm.valid) {
      const nuevaProvincia: Provincia ={
        idProvincia: 0,
        nombre: this.nuevaProvinciaForm.get('nombre')?.value,
        idPais: +this.nuevaProvinciaForm.get('idPais')?.value
      };

      this.provinciaService.agregarProvincia(nuevaProvincia).subscribe(() => {
        console.log('Provincia agregada');
      }, error => {
        console.error('Error al guardar la provincia',error);
      });
      this.dialogRef.close(true);
    }
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

  obtenerPaises(): void{
    this.paisService.obtenerPaises().subscribe(paises => {
      this.paises = paises;
    });
  }

}
