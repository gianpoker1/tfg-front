import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { SolicitarServicioDialogComponent } from '../solicitar-servicio-dialog/solicitar-servicio-dialog.component';
import { ServicioSolicitadoService } from 'src/app/services/servicio-solicitado.service';
import { ServicioSolicitado } from 'src/app/models/ServicioSolicitado';
import { ServicioSolicitadoConDisponible } from 'src/app/models/servicio-solicitado-con-disponible';
import { NotaAdicionalModalComponent } from '../nota-adicional-modal/nota-adicional-modal.component';

@Component({
  selector: 'app-servicios-usuario',
  templateUrl: './servicios-usuario.component.html',
  styleUrls: ['./servicios-usuario.component.css']
})
export class ServiciosUsuarioComponent implements OnInit{

  serviciosSolicitados!: ServicioSolicitado[];
  serviciosSolcitadosCliente: ServicioSolicitado[] = [];
  servicioSolcitadoConDisponible: ServicioSolicitadoConDisponible[] = [];
  userName!: string;
  usuario!: Usuario;
  idUsuario!: number;
  idCliente!: number;

  columnas: string[] = ['nombre', 'entregado', 'fechaInicio', 'fechaEntrega', 'notas','subTotal'];

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private servicioSolicitadoService: ServicioSolicitadoService,
    public dialog: MatDialog
  ) { 
    
  }
  ngOnInit(): void {
    this.getIdCliente();
    
    
  }   
  
  getIdCliente(): void {
    this.authService.getClienteId().subscribe(idCliente => {
      this.idCliente = idCliente!;
      this.getServiciosSolicitados(this.idCliente);
    });
  }

  getServiciosSolicitados(idCliente: number): void {
    this.servicioSolicitadoService.obtenerServiciosSolicitadosPorIdCliente(idCliente)
    .subscribe(servicioSolicitadoConDisponible => {
      this.servicioSolcitadoConDisponible = servicioSolicitadoConDisponible;
      console.log('SERVICIO SOLICTIADO CON DISPONIBLE: ',this.servicioSolcitadoConDisponible);
      
    });
  }


  obtenerEntregado(entregado: boolean): string {
    return entregado ? 'Sí' : 'No';
  }

  obtenerNombreTrabajador(idTrabajador: number): string{
    this.usuarioService.findById(idTrabajador).subscribe(usuario => {
      return usuario.nombre;
    });
    return '';
  }

  solicitarServicioDialog(): void{
    const dialogRef = this.dialog.open(SolicitarServicioDialogComponent, {
      width: '1000px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.ngOnInit();
      }
    });
  }

  openModal(notas: string): void{
    const dialogRef = this.dialog.open(NotaAdicionalModalComponent, {
      width: '500px',
      data: notas
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  


}
