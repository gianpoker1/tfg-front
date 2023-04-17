import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto.model';
import { MatDialog } from '@angular/material/dialog';
import { EditarProductoDialogComponent } from '../editar-producto-dialog/editar-producto-dialog.component';
import { EliminarProductoDialogComponent } from '../eliminar-producto-dialog/eliminar-producto-dialog.component';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  productos!: Producto[];

  columnas: string[] = ['nombre', 'descripcion', 'precio', 'existencias', 'idCategoria', 'acciones'];


  constructor(private productoService: ProductoService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.productoService.obtenerProductos()
      .subscribe(productos => this.productos = productos);
  }

  editarProductoDialog(idProducto: number): void {
    const dialogRef = this.dialog.open(EditarProductoDialogComponent, {
      width: '500px',
      data: idProducto
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProductos();
      }
    });
  }

  eliminarProductoDialog(idProducto: number): void {
    const dialogRef = this.dialog.open(EliminarProductoDialogComponent, {
      width: '500px',
      data: idProducto
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProductos();
      }
    });
  }
}
