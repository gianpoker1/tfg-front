import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pais } from '../../models/pais.model';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-eliminar-pais-dialog',
  templateUrl: './eliminar-pais-dialog.component.html',
  styleUrls: ['./eliminar-pais-dialog.component.css']
})
export class EliminarPaisDialogComponent implements OnInit{

  pais!: Pais;
  nombrePais!: string;

  constructor(
    public dialogRef: MatDialogRef<EliminarPaisDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private paisService: PaisService
  ) { }

  ngOnInit(): void {
    this.paisService.obtenerPaisPorId(this.data).subscribe(pais => {
      this.pais = pais;
      this.nombrePais = pais.nombre;
    });
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

  eliminar(): void {
    this.paisService.eliminarPais(this.pais.idPais).subscribe(() => {
      console.log('Pais eliminado');
    });
    this.dialogRef.close(true);
  }

}
