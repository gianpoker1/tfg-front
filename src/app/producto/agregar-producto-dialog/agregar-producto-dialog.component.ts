import { Component, Inject } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-agregar-producto-dialog',
  templateUrl: './agregar-producto-dialog.component.html',
  styleUrls: ['./agregar-producto-dialog.component.css']
})
export class AgregarProductoDialogComponent {

  nuevoProducto: Producto = {
    idProducto: 0,
    nombre: '',
    descripcion: '',
    precio: 0,
    existencias: 0,
    idCategoria: 0
  };

  categorias: Categoria[] = [];

  constructor(
    public dialogRef: MatDialogRef<AgregarProductoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoriaService: CategoriaService,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.categoriaService.obtenerCategorias()
      .subscribe(categorias => {
        this.categorias = categorias;
        this.categorias.forEach(categoria => console.log(categoria.nombre));
      });
  }

  agregarProducto(): void {
    const categoriaSeleccionada = this.categorias.find(categoria => categoria.idCategoria === this.nuevoProducto.idCategoria);
    if (categoriaSeleccionada) {
      this.nuevoProducto.idCategoria = categoriaSeleccionada.idCategoria;
    }
    this.productoService.agregarProducto(this.nuevoProducto).subscribe(
      () => {
        console.log('Producto agregado');
      }, error => {
        console.log('Error al guardar producto' ,error);
      });
    this.dialogRef.close(true);
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }
}
