import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServicioDisponible } from 'src/app/models/ServicioDisponible';
import { ServicioSolicitado } from 'src/app/models/ServicioSolicitado';
import { AuthService } from 'src/app/services/auth.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { ServicioDisponibleService } from 'src/app/services/servicio-disponible.service';
import { ServicioSolicitadoService } from 'src/app/services/servicio-solicitado.service';
import { SolicitarServicioDisponibleDialogComponent } from '../solicitar-servicio-disponible-dialog/solicitar-servicio-disponible-dialog.component';
import { delay, filter } from 'rxjs';

@Component({
  selector: 'app-servicios-disponibles',
  templateUrl: './servicios-disponibles.component.html',
  styleUrls: ['./servicios-disponibles.component.css']
})
export class ServiciosDisponiblesComponent implements OnInit {

  serviciosDisponibles: ServicioDisponible[]=[];
  servicioDisponible!: ServicioDisponible;
  servicioSolicitado!: ServicioSolicitado;


  columnas: string[] = ['idServicioDisponible', 'nombre', 'descripcion', 'precio', 'duracion', 'acciones'];

  constructor(
    private servicioDisponibleService: ServicioDisponibleService,
    public dialog: MatDialog,
    private authService: AuthService,
    private clienteService: ClienteService
  ) { }


  ngOnInit(): void {  
    this.getServiciosDisponibles();
  }

  getServiciosDisponibles() : void{
    this.servicioDisponibleService.obtenerServiciosDisponibles().subscribe(serviciosDisponibles => {
      this.serviciosDisponibles = serviciosDisponibles;
    });
  }

  solicitarServicio(idServicioDisponible: number): void{
    const dialogRef = this.dialog.open(SolicitarServicioDisponibleDialogComponent, {
      width: '1000px',
      data: idServicioDisponible
    });

    dialogRef.afterClosed().pipe(
      filter(result => !!result),
      delay(500),
    ).subscribe(result => {
      this.getServiciosDisponibles();
    });
  }



}
