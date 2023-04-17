import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { Trabajador } from '../models/trabajador.model';

@Component({
  selector: 'app-eliminar-trabajador-dialog',
  templateUrl: './eliminar-trabajador-dialog.component.html',
  styleUrls: ['./eliminar-trabajador-dialog.component.css']
})
export class EliminarTrabajadorDialogComponent implements OnInit {

  idTrabajador!: number;
  trabajador!: Trabajador;

  constructor(
    public dialogRef: MatDialogRef<EliminarTrabajadorDialogComponent>,
    private trabajadorService: TrabajadorService
  ) { }

  ngOnInit(): void {
    // Obtener los detalles del trabajador
    this.trabajadorService.obtenerTrabajadorPorId(this.idTrabajador).subscribe(trabajador => {
      this.trabajador = trabajador;
    });
  }

  eliminarTrabajador(): void {
    this.trabajadorService.eliminarTrabajador(this.idTrabajador).subscribe(() => {
      this.dialogRef.close(true); // Cerrar el diálogo y actualizar la lista de trabajadores
    });
  }

  cancelar(): void {
    this.dialogRef.close(false); // Cerrar el diálogo sin hacer nada
  }

}
