import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../models/producto.model';
import { Categoria } from '../models/categoria.model';
import { ProductoService } from '../services/producto.service';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-editar-producto-dialog',
  templateUrl: './editar-producto-dialog.component.html',
  styleUrls: ['./editar-producto-dialog.component.css']
})
export class EditarProductoDialogComponent implements OnInit {

  productoForm: FormGroup;
  categorias!: Categoria[];

  constructor(
    public dialogRef: MatDialogRef<EditarProductoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private categoriaService: CategoriaService
  ) {
    this.productoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      existencias: ['', Validators.required],
      idCategoria: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.categoriaService.obtenerCategorias().subscribe((categorias: Categoria[]) => {
      this.categorias = categorias;
    });

    this.productoService.obtenerProductoPorId(this.data).subscribe((producto: Producto) => {
      this.productoForm.patchValue(producto);
    });
  }

  guardarCambios(): void {
    const producto: Producto = this.productoForm.value;
    producto.idProducto = this.data;

    this.productoService.actualizarProducto(producto.idProducto, producto).subscribe(() => {
      this.dialogRef.close(true); // Cerrar el diálogo y actualizar la lista de productos
    });
  }

  cancelar(): void {
    this.dialogRef.close(false); // Cerrar el diálogo sin hacer nada
  }

}

