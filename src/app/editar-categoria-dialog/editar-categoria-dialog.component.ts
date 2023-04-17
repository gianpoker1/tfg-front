import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from '../models/categoria.model';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-editar-categoria-dialog',
  templateUrl: './editar-categoria-dialog.component.html',
  styleUrls: ['./editar-categoria-dialog.component.css']
})
export class EditarCategoriaDialogComponent implements OnInit {

  categoriaForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditarCategoriaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService
  ) {
    this.categoriaForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.categoriaService.obtenerCategoriaPorId(this.data).subscribe((categoria: Categoria) => {
      this.categoriaForm.patchValue(categoria);
    });
  }

  guardarCambios(): void {
    const categoria: Categoria = this.categoriaForm.value;
    categoria.idCategoria = this.data;

    this.categoriaService.actualizarCategoria(categoria.idCategoria, categoria).subscribe(() => {
      this.dialogRef.close(true); // Cerrar el diálogo y actualizar la lista de categorías
    });
  }

  cancelar(): void {
    this.dialogRef.close(false); // Cerrar el diálogo sin hacer nada
  }

}
