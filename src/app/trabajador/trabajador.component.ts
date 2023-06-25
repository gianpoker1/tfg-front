import { Component, OnInit } from '@angular/core';
import { Trabajador } from 'src/app/models/trabajador.model';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { MatDialog } from '@angular/material/dialog';
import { EditarTrabajadorDialogComponent } from './editar-trabajador-dialog/editar-trabajador-dialog.component';
import { EliminarTrabajadorDialogComponent } from './eliminar-trabajador-dialog/eliminar-trabajador-dialog.component';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';
import { forkJoin } from 'rxjs';
import { delay, filter, map, switchMap } from 'rxjs/operators';
import { UserTrabajador } from '../models/user-trabajador';
import { Pais } from '../models/pais.model';
import { Provincia } from '../models/provincia.model';
import { Ciudad } from '../models/ciudad.model';
import { PaisService } from '../services/pais.service';
import { ProvinciaService } from '../services/provincia.service';
import { CiudadService } from '../services/ciudad.service';
import { AgregarTrabajadorComponent } from './agregar-trabajador/agregar-trabajador.component';

@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styleUrls: ['./trabajador.component.css']
})
export class TrabajadorComponent implements OnInit {

  trabajadores!: Trabajador[];
  usuario: Usuario[] = [];
  userTrabajador: UserTrabajador[] = [];
  pais!: Pais;
  provincia!: Provincia;
  ciudad!: Ciudad;


  columnas: string[] = ['dni', 'tipo', 'nombre', 'userName', 'telefono', 'pais', 'provincia', 'ciudad', 'acciones'];

  constructor(private trabajadorService: TrabajadorService, 
    private usuarioService: UsuarioService,
    public dialog: MatDialog,
    private paisService: PaisService,
    private provinciaService: ProvinciaService,
    private ciudadService: CiudadService
    ) { }

  ngOnInit() {
    this.getTrabajadores();
  }

  getTrabajadores() {
    this.trabajadorService.obtenerTrabajadores().subscribe(trabajadores => {
      this.trabajadores = trabajadores;

      const requests = this.trabajadores.map(trabajador => {
        return this.usuarioService.findById(trabajador.idUsuario).pipe(
          switchMap(usuario => {
            return this.paisService.obtenerPaisPorId(usuario.pais).pipe(

              switchMap(pais =>{
                return this.provinciaService.obtenerProvinciaPorId(usuario.provincia).pipe(
                  switchMap(provincia => {
                    return this.ciudadService.obtenerCiudadPorId(usuario.ciudad).pipe(
                      map(ciudad => {
                        return {
                          usuario: usuario,
                          trabajador: trabajador,
                          pais: pais,
                          provincia: provincia,
                          ciudad: ciudad,
                          roles: []                          
                        };
                      })
                    );
                  })
                );
              })
            );
          })
        );
      });
  
      forkJoin(requests).subscribe(userTrabajadores => {
        this.userTrabajador = userTrabajadores;
        this.usuario = this.userTrabajador.map(userTrabajador => userTrabajador.usuario);
      });

    });
  }

  agregarTrabajador(): void {
    const dialogRef = this.dialog.open(AgregarTrabajadorComponent, {
      width: '1000px',
    });

    dialogRef.afterClosed().pipe(
      filter(result => !!result),
      delay(1000)
    ).subscribe(result => {
      this.getTrabajadores();
    });
  }

  editarTrabajador(idTrabajador: number): void {
    const dialogRef = this.dialog.open(EditarTrabajadorDialogComponent, {
      width: '1000px',
      data: idTrabajador
    });


    dialogRef.afterClosed().pipe(
      filter(result => !!result),
      delay(500)
    ).subscribe(result => {
      this.getTrabajadores();
    });

  }
  

  eliminarTrabajador(idTrabajador: number): void {
    const dialogRef = this.dialog.open(EliminarTrabajadorDialogComponent, {
      width: '400px',
      data: idTrabajador
    });

    dialogRef.afterClosed().pipe(
      filter(result => !!result),
      delay(500)
    ).subscribe(result => {
      this.getTrabajadores();
    });
  }



}
