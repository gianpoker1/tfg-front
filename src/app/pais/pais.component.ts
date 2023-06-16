import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Pais } from 'src/app/models/pais.model';
import { PaisService } from 'src/app/services/pais.service';
import { EditarPaisDialogComponent } from './editar-pais-dialog/editar-pais-dialog.component';
import { EliminarPaisDialogComponent } from './eliminar-pais-dialog/eliminar-pais-dialog.component';
import { AgregarPaisDialogComponent } from './agregar-pais-dialog/agregar-pais-dialog.component';
import { ProvinciaService } from '../services/provincia.service';
import { CiudadService } from '../services/ciudad.service';
import { Provincia } from '../models/provincia.model';
import { Ciudad } from '../models/ciudad.model';
import { AgregarProvinciaDialogComponent } from '../provincia/agregar-provincia-dialog/agregar-provincia-dialog.component';
import { EditarProvinciaDialogComponent } from '../provincia/editar-provincia-dialog/editar-provincia-dialog.component';
import { EliminarProvinciaDialogComponent } from '../provincia/eliminar-provincia-dialog/eliminar-provincia-dialog.component';
import { AgregarCiudadDialogComponent } from '../ciudad/agregar-ciudad-dialog/agregar-ciudad-dialog.component';
import { EditarCiudadDialogComponent } from '../ciudad/editar-ciudad-dialog/editar-ciudad-dialog.component';
import { EliminarCiudadDialogComponent } from '../ciudad/eliminar-ciudad-dialog/eliminar-ciudad-dialog.component';
import { CiudadConProvinciaYPais } from '../models/ciudad-con-provincia-ypais';


@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {

  paises!: Pais[];
  provincias!: Provincia[];
  ciudades!: Ciudad[];
  pais!: Pais;
  provinciasConNombrePais: {provincia: Provincia, nombrePais: string}[]= [];
  ciudadesConProvinciaYPais: CiudadConProvinciaYPais[] = [];


  constructor(
    private paisService: PaisService,
    private provinciaService: ProvinciaService,
    private ciudadService: CiudadService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getPaises();
    this.getProvincias();
    this.getCiudades();
  }

  getPaises() :void{
    this.paisService.obtenerPaises().subscribe(paises => {
      this.paises = paises;
      
    });
  }

  getProvincias() :void{
    this.provinciaService.obtenerProvincias().subscribe(provincias => {
      this.provincias = provincias;
      
      const observables = provincias.map(provincia =>
        this.provinciaService.obtenerProvinciaConNombrePais(provincia.idProvincia)
      );
  
      forkJoin(observables).subscribe(data => {
        this.provinciasConNombrePais = data;
      });
    
      
    });
  }

  getCiudades() : void{
    this.ciudadService.obtenerCiudades().subscribe(ciudades => {
      this.ciudades = ciudades;

      const observables = ciudades.map(ciudad =>
        this.ciudadService.obtenerCiudadConProvinciaYPais(ciudad.idCiudad)
      );

      forkJoin(observables).subscribe(data => {
        this.ciudadesConProvinciaYPais = data;
      });
    });
  }

  agregarPaisDialog(): void{
    const dialogRef = this.dialog.open(AgregarPaisDialogComponent, {
      width: '1000px'
      });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getPaises();
      }
    });
  }

  editarPais(pais: number): void {
    const dialogRef = this.dialog.open(EditarPaisDialogComponent, {
      width: '400px',
      data: pais
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getPaises();
      }
    });
  }

  borrarPais(idPais: number): void {
    const dialogRef = this.dialog.open(EliminarPaisDialogComponent, {
      width: '500px',
      data: idPais
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getPaises();
      }
    });
  }

  agregarProvinciaDialog(): void{
    const dialogRef = this.dialog.open(AgregarProvinciaDialogComponent, {
      width: '1000px'
      });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getProvincias();
      }
    }
    );
  }

  editarProvincia(idProvincia: number): void{
    const dialogRef = this.dialog.open(EditarProvinciaDialogComponent, {
      width: '1000px',
      data: idProvincia
      });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getProvincias();
      }
    }
    );
  }

  borrarProvincia(idProvincia: number) :void{
    const dialogRef = this.dialog.open (EliminarProvinciaDialogComponent, {
      width: '500px',
      data: idProvincia
      });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getProvincias();
      }
    }
    );
  }

  agregarCiudadDialog(): void{
    const dialogRef = this.dialog.open (AgregarCiudadDialogComponent, {
      width: '1000px'
      });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getCiudades();
      }
    }
    );
  }

  editarCiudad(ciudad: number): void{
    const dialogRef = this.dialog.open(EditarCiudadDialogComponent, {
      width: '1000px',
      data: ciudad
      });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getCiudades();
      }
    }
    );
  }

  borrarCiudad(idCiudad: number): void {
    const dialogRef = this.dialog.open (EliminarCiudadDialogComponent, {
      width: '500px',
      data: idCiudad
      });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.getCiudades();
      }
    }
    );
  }
}
