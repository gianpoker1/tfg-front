import { Component, OnInit } from '@angular/core';
import { Trabajador } from 'src/app/models/trabajador.model';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarTrabajadorDialogComponent } from '../editar-trabajador-dialog/editar-trabajador-dialog.component';
import { EliminarTrabajadorDialogComponent } from '../eliminar-trabajador-dialog/eliminar-trabajador-dialog.component';

@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.css']
})
export class TrabajadorComponent implements OnInit {

  trabajadores!: Trabajador[];

  constructor(private trabajadorService: TrabajadorService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getTrabajadores();
  }

  getTrabajadores() {
    this.trabajadorService.obtenerTrabajadores().subscribe(trabajadores => {
      this.trabajadores = trabajadores;
    });
  }

  editarTrabajador(idTrabajador: number): void {
    const dialogRef = this.dialog.open(EditarTrabajadorDialogComponent, {
      width: '400px',
      data: idTrabajador
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTrabajadores();
      }
    });
  }

  eliminarTrabajador(idTrabajador: number): void {
    const dialogRef = this.dialog.open(EliminarTrabajadorDialogComponent, {
      width: '400px',
      data: idTrabajador
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getTrabajadores();
      }
    });
  }

}
