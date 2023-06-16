import { Component, Inject, OnInit } from '@angular/core';
import { Provincia } from '../../models/provincia.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProvinciaService } from '../../services/provincia.service';

@Component({
  selector: 'app-eliminar-provincia-dialog',
  templateUrl: './eliminar-provincia-dialog.component.html',
  styleUrls: ['./eliminar-provincia-dialog.component.css']
})
export class EliminarProvinciaDialogComponent implements OnInit {

  provincia!: Provincia;
  nombreProvincia!: string;

  constructor(
    public dialogRef: MatDialogRef<EliminarProvinciaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private provinciaService: ProvinciaService
  ) { }

  ngOnInit(): void {
    this.provinciaService.obtenerProvinciaPorId(this.data).subscribe(provincia => {
      this.provincia = provincia;
      this.nombreProvincia = provincia.nombre;
    })
  }

  eliminar(): void {
    this.provinciaService.eliminarProvincia(this.provincia.idProvincia).subscribe(() => {
      console.log("Provincia eliminada");
    });
    this.dialogRef.close(true);
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

}
