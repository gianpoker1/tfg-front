import { Component, OnInit } from '@angular/core';
import { DetalleServicioService } from '../services/detalle-servicio.service';
import { DetalleServicio } from '../models/detalle-servicio.model';

@Component({
  selector: 'app-detalle-servicio',
  templateUrl: './detalle-servicio.component.html',
  styleUrls: ['./detalle-servicio.component.css']
})
export class DetalleServicioComponent implements OnInit {

  detalleServicios!: DetalleServicio[];

  constructor(private detalleServicioService: DetalleServicioService) { }

  ngOnInit(): void {
    this.getDetalleServicios();
  }

  getDetalleServicios(): void {
    this.detalleServicioService.obtenerDetallesServicio()
      .subscribe(detalleServicios => this.detalleServicios = detalleServicios);
  }

}