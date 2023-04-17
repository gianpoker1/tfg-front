import { Component, OnInit } from '@angular/core';
import { DetalleCompra } from '../models/detalle-compra.model';
import { DetalleCompraService } from '../services/detalle-compra.service';

@Component({
  selector: 'app-detalle-compra',
  templateUrl: './detalle-compra.component.html',
  styleUrls: ['./detalle-compra.component.css']
})
export class DetalleCompraComponent implements OnInit {
  detallesCompra: DetalleCompra[] = [];
  detalleCompraSeleccionado: DetalleCompra | undefined;

  constructor(private detalleCompraService: DetalleCompraService) { }

  ngOnInit(): void {
    this.getDetallesCompra();
  }

  getDetallesCompra(): void {
    this.detalleCompraService.obtenerDetallesCompra().subscribe(
      detallesCompra => {
        this.detallesCompra = detallesCompra;
      }
    );
  }

  agregar(cantidad: number, precio: number, idCompra: number, idProducto: number): void {
    if (!cantidad || !precio || !idCompra || !idProducto) { return; }
    this.detalleCompraService.agregarDetalleCompra({ cantidad, precio, idCompra, idProducto } as DetalleCompra)
      .subscribe(detalleCompra => {
        this.detallesCompra.push(detalleCompra);
      });
  }

  eliminar(detalleCompra: DetalleCompra): void {
    this.detallesCompra = this.detallesCompra.filter(dc => dc !== detalleCompra);
    this.detalleCompraService.eliminarDetalleCompra(detalleCompra.idCompra).subscribe();
  }

  onSelect(detalleCompra: DetalleCompra): void {
    this.detalleCompraSeleccionado = detalleCompra;
  }
}
