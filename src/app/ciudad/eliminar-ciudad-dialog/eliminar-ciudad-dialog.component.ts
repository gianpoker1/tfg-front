import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CiudadService } from '../../services/ciudad.service';
import { Ciudad } from '../../models/ciudad.model';

@Component({
  selector: 'app-eliminar-ciudad-dialog',
  templateUrl: './eliminar-ciudad-dialog.component.html',
  styleUrls: ['./eliminar-ciudad-dialog.component.css']
})
export class EliminarCiudadDialogComponent implements OnInit{

  ciudad!: Ciudad;
  nombre!: string;

  constructor(
    public dialogRef: MatDialogRef<EliminarCiudadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ciudadService: CiudadService

  ) { }
  ngOnInit(): void {
    this.ciudadService.obtenerCiudadPorId(this.data).subscribe(ciudad =>{
      this.ciudad = ciudad;
      this.nombre = ciudad.nombre;
    });
  }

  cancelar(){
    this.dialogRef.close(false);
  }

  eliminar(): void{
    this.ciudadService.eliminarCiudad(this.ciudad.idCiudad).subscribe(() =>{
      console.log('Ciudad eliminada');
    });
    this.dialogRef.close(true);
  }

}
