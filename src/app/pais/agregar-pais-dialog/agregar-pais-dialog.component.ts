import { Component, Inject } from '@angular/core';
import { Pais } from '../../models/pais.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-agregar-pais-dialog',
  templateUrl: './agregar-pais-dialog.component.html',
  styleUrls: ['./agregar-pais-dialog.component.css']
})
export class AgregarPaisDialogComponent {

  nuevoPaisForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AgregarPaisDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private paisService: PaisService
    ) { }

  ngOnInit(): void {
    this.nuevoPaisForm = this.formBuilder.group({
      nombre: ['', Validators.required]
    });
  }
  
  agregarPais(): void {
    if(this.nuevoPaisForm.valid) {
      const nuevoPais: Pais ={
        idPais: 0,
        nombre: this.nuevoPaisForm.get('nombre')?.value
      };

      this.paisService.agregarPais(nuevoPais).subscribe(() => {
        console.log('Pais agregado');
      }, error =>{
        console.log('Error al guardar el pais', error);
      });
      this.dialogRef.close(true);
    }
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

}
