import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/models/servicio.model';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-servicios-usuario',
  templateUrl: './servicios-usuario.component.html',
  styleUrls: ['./servicios-usuario.component.css']
})
export class ServiciosUsuarioComponent implements OnInit{

  servicios!: Servicio[];
  userName!: string;
  usuario!: Usuario;

  columnas: string[] = ['nombre', 'entregado', 'fechaInicio', 'fechaEntrega', 'formaDePago', 'trabajador','notas','subTotal'];

  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    private servicioService: ServicioService
  ) { 
    
  }
  ngOnInit(): void {

    this.userName = this.authService.user!.userName || '';
    
    this.usuarioService.findByUserName(this.userName).subscribe(usuario => {
      
      this.usuario = usuario;

      this.servicioService.obtenerServiciosPorIdUsuario(this.usuario.id).subscribe(servicios => {
        this.servicios = servicios;
      });
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


}
