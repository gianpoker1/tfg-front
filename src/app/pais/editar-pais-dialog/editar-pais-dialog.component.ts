import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pais } from '../../models/pais.model';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-editar-pais-dialog',
  templateUrl: './editar-pais-dialog.component.html',
  styleUrls: ['./editar-pais-dialog.component.css']
})
export class EditarPaisDialogComponent implements OnInit{

  paisForm: FormGroup;
  pais!: Pais;

  constructor(
    public dialogRef: MatDialogRef<EditarPaisDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Pais,
    private formBuilder: FormBuilder,
    private paisService: PaisService
  ) { 
    this.paisForm = this.formBuilder.group({
      nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.paisService.obtenerPaisPorId(this.data.idPais).subscribe(pais => {
      this.pais = pais;
      this.paisForm.patchValue(pais);
    });
  }

  guardarCambios(): void {
    const pais:Pais = this.paisForm.value;
    pais.idPais = this.pais.idPais;

    this.paisService.actualizarPais(pais.idPais, pais).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

}
