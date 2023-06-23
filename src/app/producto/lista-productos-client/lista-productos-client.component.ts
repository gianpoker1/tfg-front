import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { Categoria } from 'src/app/models/categoria.model';
import { Producto } from 'src/app/models/producto.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-lista-productos-client',
  templateUrl: './lista-productos-client.component.html',
  styleUrls: ['./lista-productos-client.component.css']
})
export class ListaProductosClientComponent implements OnInit {

  productos!: Producto[];
  categorias: Categoria[] = [];

  columnas: string[] = ['nombre', 'descripcion', 'precio', 'existencias', 'idCategoria'];


  constructor(private productoService: ProductoService,
    private categoriaService: CategoriaService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProductos();
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

  obtenerNombreCategoria(idCategoria: number): string {
    const categoria = this.categorias.find(c => c.idCategoria === idCategoria);
    return categoria ? categoria.nombre : 'Sin categoria';
  }
}
