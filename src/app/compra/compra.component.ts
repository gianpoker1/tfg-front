import { Component, OnInit } from '@angular/core';
import { Compra } from '../models/compra.model';
import { CompraService } from '../services/compra.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  compras: Compra[] = [];
  compraSeleccionada: Compra | undefined;

  constructor(private compraService: CompraService) { }

  ngOnInit(): void {
    this.getCompras();
  }

  getCompras(): void {
    this.compraService.obtenerCompras().subscribe(
      compras => {
        this.compras = compras;
      }
    );
  }

  agregar(compra: Compra): void {
    if (!compra) { return; }
    this.compraService.agregarCompra(compra)
      .subscribe(compra => {
        this.compras.push(compra);
      });
  }

  eliminar(compra: Compra): void {
    this.compras = this.compras.filter(c => c !== compra);
    this.compraService.eliminarCompra(compra.idCompra).subscribe();
  }

  onSelect(compra: Compra): void {
    this.compraSeleccionada = compra;
  }
}