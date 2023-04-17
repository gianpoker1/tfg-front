import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-servicio-dialog',
  templateUrl: './eliminar-servicio-dialog.component.html',
  styleUrls: ['./eliminar-servicio-dialog.component.css']
})
export class EliminarServicioDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EliminarServicioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) { }

  ngOnInit(): void {
  }

  eliminar(): void {
    this.dialogRef.close(true);
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

}