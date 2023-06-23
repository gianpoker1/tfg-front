import { Component, OnInit } from '@angular/core';

import { Proovedor } from 'src/app/models/proovedor.model';
import { ProovedorService } from 'src/app/services/proovedor.service';
import { EliminarProveedorDialogComponent } from './eliminar-proveedor-dialog/eliminar-proveedor-dialog.component';
import { EditarProveedorDialogComponent } from './editar-proveedor-dialog/editar-proveedor-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PaisService } from '../services/pais.service';
import { ProvinciaService } from '../services/provincia.service';
import { CiudadService } from '../services/ciudad.service';

import { CiudadConProvinciaYPais } from '../models/ciudad-con-provincia-ypais';
import { Ciudad } from '../models/ciudad.model';
import { Provincia } from '../models/provincia.model';
import { Pais } from '../models/pais.model';
import { AgregarProveedorDialogComponent } from './agregar-proveedor-dialog/agregar-proveedor-dialog.component';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proovedor.component.html',
  styleUrls: ['./proovedor.component.css']
})
export class ProveedorComponent implements OnInit {

  proveedores!: Proovedor[];
  paises!: Pais[];
  provincias!: Provincia[];
  ciudades!: Ciudad[];
  

  columnas: string[] = ['nif', 'nombre','direccion', 'telefono','idPais', 'idCiudad', 'idProvincia', 'email', 'acciones'];

  constructor(private proveedorService: ProovedorService,
    public dialog: MatDialog,
    private paisService: PaisService,
    private provinciaService: ProvinciaService,
    private ciudadService: CiudadService
    ) { }

  ngOnInit() {
    this.getProveedores();
    this.getPaises();
    this.getProvincias();
    this.getCiudades();
  }

  getProveedores() :void{
    this.proveedorService.obtenerProovedores().subscribe(proveedores => {
      this.proveedores = proveedores;

    });
  }

  getPaises() : void{
    this.paisService.obtenerPaises().subscribe(paises => {
      this.paises = paises;
    });
  }

  getProvincias() : void{
    this.provinciaService.obtenerProvincias().subscribe(provincias => {
      this.provincias = provincias;
    });
  }

  getCiudades() : void{
    this.ciudadService.obtenerCiudades().subscribe(ciudades => {
      this.ciudades = ciudades;
    });
  }

  obtenerNombrePais(idPais: number): string{
    const nombre = this.paises?.find(pais => pais.idPais === idPais)!.nombre;
    return nombre;
  }

  obtenerNombreProvincia(idProvincia: number): string{
    const nombre = this.provincias?.find(provincia => provincia.idProvincia === idProvincia)!.nombre;
    return nombre;
  }

  obtenerNombreCiudad(idCiudad: number): string{
    const nombre = this.ciudades?.find(ciudad => ciudad.idCiudad === idCiudad)!.nombre;
    return nombre;
  }

  agregarProveedor(): void {
    const dialogRef = this.dialog.open(AgregarProveedorDialogComponent, {
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProveedores();
      }
    });
  }

  eliminarProveedor(idProveedor: number): void {
    const dialogRef = this.dialog.open(EliminarProveedorDialogComponent, {
      width: '400px',
      data: idProveedor
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProveedores();
      }
    });
  }

  editarProveedor(idProveedor: number): void {
    const dialogRef = this.dialog.open(EditarProveedorDialogComponent, {
      width: '1000px',
      data: idProveedor
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProveedores();
      }
    });
  }

}
