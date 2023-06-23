import { Component, OnInit } from '@angular/core';
import { Compra } from '../models/compra.model';
import { CompraService } from '../services/compra.service';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { AgregarCompraDialogComponent } from './agregar-compra-dialog/agregar-compra-dialog.component';
import { EditarCompraDialogComponent } from './editar-compra-dialog/editar-compra-dialog.component';
import { EliminarCompraDialogComponent } from './eliminar-compra-dialog/eliminar-compra-dialog.component';
import { Proovedor } from '../models/proovedor.model';
import { ProovedorService } from '../services/proovedor.service';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto.model';
import { TrabajadorService } from '../services/trabajador.service';
import { DetalleCompra } from '../models/detalle-compra';


@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  compras: Compra[] = [];
  proovedores: Proovedor[] = [];
  productos: Producto[] = [];
  detalleCompras: DetalleCompra[] = [];
  columnas: string[] = ['fecha','cantidad','precio', 'total','proovedor','producto','trabajador', 'acciones'];

  



  constructor(
    private compraService: CompraService,
    private dialog: MatDialog,
    private proovedorService: ProovedorService,
    private productoService: ProductoService,
    private trabajadorService: TrabajadorService
    ) { }

  ngOnInit(): void {
    this.getCompras();
  }

  getCompras(): void {

    this.compraService.obtenerCompras().subscribe(compras => {
      this.compras = compras;
      const requests = this.compras.map(compra => {
        const proovedorRequest = this.proovedorService.obtenerProovedorPorId(compra.idProovedor);
        const productoRequest = this.productoService.obtenerProductoPorId(compra.idProducto);
        const trabajadorRequest = this.trabajadorService.obtenerTrabajadorPorId(compra.idTrabajador);

        return forkJoin([proovedorRequest, productoRequest, trabajadorRequest]).pipe(
          map(([proovedor, producto, trabajador]) => ({
            compra, 
            proovedor, 
            producto, trabajador
          }))
      );
      });
      forkJoin(requests).subscribe(detalleCompras => {
        this.detalleCompras = detalleCompras;
        
      });
    });
  }

  agregarCompra(): void {
    const dialogRef = this.dialog.open(AgregarCompraDialogComponent, {
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getCompras();
      }
    });
  }

  editarCompra(detalleCompra: DetalleCompra): void{
    const dialogRef = this.dialog.open(EditarCompraDialogComponent, {
      width: '1000px',
      data: detalleCompra
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getCompras();
      }
    });
  }

  eliminarCompra(idCompra: number): void{
    const dialogRef = this.dialog.open(EliminarCompraDialogComponent, {
      width: '550px',
      data: idCompra
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getCompras();
      }
    });
  }

 


}