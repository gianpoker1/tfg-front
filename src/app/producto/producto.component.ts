import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto.model';
import { MatDialog } from '@angular/material/dialog';
import { EditarProductoDialogComponent } from './editar-producto-dialog/editar-producto-dialog.component';
import { EliminarProductoDialogComponent } from './eliminar-producto-dialog/eliminar-producto-dialog.component';
import { AgregarProductoDialogComponent } from './agregar-producto-dialog/agregar-producto-dialog.component';
import { Categoria } from '../models/categoria.model';
import { delay, filter, forkJoin } from 'rxjs';
import { CategoriaService } from '../services/categoria.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  productos!: Producto[];
  categorias: Categoria[] = [];

  columnas: string[] = ['nombre', 'descripcion', 'precio', 'existencias', 'idCategoria', 'acciones'];


  constructor(private productoService: ProductoService,
    private categoriaService: CategoriaService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProductos();
  }

  agregarProductoDialog(): void {
    const dialogRef = this.dialog.open(AgregarProductoDialogComponent, {
      width: '1000px'
    });

    dialogRef.afterClosed().pipe(
      filter(result => !!result),
      delay(500)
    ).subscribe(result => {
      this.getProductos();
    });
  }

  getProductos(): void {
    forkJoin([
      this.productoService.obtenerProductos(),
      this.categoriaService.obtenerCategorias()
    ]).subscribe(([productos, categorias]) => {
      this.productos = productos;
      this.categorias = categorias;
    });
  }

  editarProductoDialog(idProducto: number): void {
    const dialogRef = this.dialog.open(EditarProductoDialogComponent, {
      width: '1000px',
      data: idProducto
    });

    dialogRef.afterClosed().pipe(
      filter(result => !!result),
      delay(500)
    ).subscribe(result => {
      this.getProductos();
    });
  }

  eliminarProductoDialog(idProducto: number): void {
    const dialogRef = this.dialog.open(EliminarProductoDialogComponent, {
      width: '500px',
      data: idProducto
    });

    dialogRef.afterClosed().pipe(
      filter(result => !!result),
      delay(500)
    ).subscribe(result => {
      this.getProductos();
    });
  }

  obtenerNombreCategoria(idCategoria: number): string {
    const categoria = this.categorias.find(c => c.idCategoria === idCategoria);
    return categoria ? categoria.nombre : 'Sin categoria';
  }
}
