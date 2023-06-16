import { Component, OnInit } from '@angular/core';
import { Proovedor } from 'src/app/models/proovedor.model';
import { ProovedorService } from 'src/app/services/proovedor.service';
import { EliminarProveedorDialogComponent } from './eliminar-proveedor-dialog/eliminar-proveedor-dialog.component';
import { EditarProveedorDialogComponent } from './editar-proveedor-dialog/editar-proveedor-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proovedor.component.html',
  styleUrls: ['./proovedor.component.css']
})
export class ProveedorComponent implements OnInit {

  proveedores!: Proovedor[];

  constructor(private proveedorService: ProovedorService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getProveedores();
  }

  getProveedores() {
    this.proveedorService.obtenerProovedores().subscribe(proveedores => {
      this.proveedores = proveedores;
    });
  }

  eliminarProveedor(proveedor: Proovedor): void {
    const dialogRef = this.dialog.open(EliminarProveedorDialogComponent, {
      width: '400px',
      data: proveedor.idProovedor
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProveedores();
      }
    });
  }

  editarProveedor(proveedor: Proovedor): void {
    const dialogRef = this.dialog.open(EditarProveedorDialogComponent, {
      width: '400px',
      data: proveedor.idProovedor
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProveedores();
      }
    });
  }

}
