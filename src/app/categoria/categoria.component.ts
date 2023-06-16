import { Component, OnInit } from '@angular/core';
import { Categoria } from '../models/categoria.model';
import { CategoriaService } from '../services/categoria.service';
import { EliminarCategoriaDialogComponent } from './eliminar-categoria-dialog/eliminar-categoria-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EditarCategoriaDialogComponent } from './editar-categoria-dialog/editar-categoria-dialog.component';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categorias: Categoria[] = [];
  categoriaSeleccionada: Categoria | undefined;

  columnas = ['idCategoria', 'nombre', 'descripcion', 'acciones'];


  constructor(private categoriaService: CategoriaService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(): void {
    this.categoriaService.obtenerCategorias().subscribe(
      categorias => {
        this.categorias = categorias;
      }
    );
  }

  agregar(nombre: string): void {
    nombre = nombre.trim();
    if (!nombre) { return; }
    this.categoriaService.agregarCategoria({ nombre } as Categoria)
      .subscribe(categoria => {
        this.categorias.push(categoria);
      });
  }

  eliminar(categoria: Categoria): void {
    this.categorias = this.categorias.filter(c => c !== categoria);
    this.categoriaService.eliminarCategoria(categoria.idCategoria).subscribe();
  }

  onSelect(categoria: Categoria): void {
    this.categoriaSeleccionada = categoria;
  }

  editarCategoriaDialog(idCategoria: number): void {
    const dialogRef = this.dialog.open(EditarCategoriaDialogComponent, {
      width: '400px',
      data: idCategoria
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoriaService.obtenerCategorias().subscribe((categorias: Categoria[]) => {
          this.categorias = categorias;
        });
      }
    });
  }

  eliminarCategoriaDialog(idCategoria: number): void {
    const dialogRef = this.dialog.open(EliminarCategoriaDialogComponent, {
      width: '400px',
      data: idCategoria
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.categoriaService.obtenerCategorias().subscribe((categorias: Categoria[]) => {
          this.categorias = categorias;
        });
      }
    });
  }
}
