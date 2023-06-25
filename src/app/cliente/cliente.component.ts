import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { EditarClienteDialogComponent } from './editar-cliente-dialog/editar-cliente-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EliminarClienteDialogComponent } from './eliminar-cliente-dialog/eliminar-cliente-dialog.component';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';
import { forkJoin } from 'rxjs';
import { delay, filter, map, switchMap } from 'rxjs/operators';
import { AgregarClienteDialogComponent } from './agregar-cliente-dialog/agregar-cliente-dialog.component';
import { Provincia } from '../models/provincia.model';
import { Ciudad } from '../models/ciudad.model';
import { Pais } from '../models/pais.model';
import { UserCliente } from '../models/user-cliente';
import { PaisService } from '../services/pais.service';
import { ProvinciaService } from '../services/provincia.service';
import { CiudadService } from '../services/ciudad.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes!: Cliente[];
  usuarios: Usuario[] = [];
  userCliente: UserCliente[] = [];
  pais!: Pais;
  provincia!: Provincia;
  ciudad!: Ciudad;
  columnas: string[] = ['userName', 'dni', 'nombre', 'apellido', 'telefono', 'direccion', 'pais', 'ciudad', 'provincia', 'acciones'];


  constructor(private clienteService: ClienteService,
    private dialog: MatDialog,
    private usuarioService: UsuarioService,
    private paisService: PaisService,
    private provinciaService: ProvinciaService,
    private ciudadService: CiudadService
    ) { }

  ngOnInit() {
    this.getClientes();
  }

  getClientes() {
    this.clienteService.obtenerClientes().subscribe(clientes => {
      this.clientes = clientes;
      const requests = this.clientes.map(cliente => {
        return this.usuarioService.findById(cliente.idUsuario).pipe(
          switchMap(usuario => {
            return this.paisService.obtenerPaisPorId(usuario.pais).pipe(

              switchMap(pais =>{
                return this.provinciaService.obtenerProvinciaPorId(usuario.provincia).pipe(
                  switchMap(provincia => {
                    return this.ciudadService.obtenerCiudadPorId(usuario.ciudad).pipe(
                      map(ciudad => {
                        return {
                          usuario: usuario,
                          cliente: cliente,
                          pais: pais,
                          provincia: provincia,
                          ciudad: ciudad                          
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

        forkJoin(requests).subscribe(userClientes => {
          this.userCliente = userClientes;
          this.usuarios = this.userCliente.map(userCliente => userCliente.usuario);
        });
    });
  }

  agregarCliente(): void {
    const dialogRef = this.dialog.open(AgregarClienteDialogComponent, {
      width: '1000px',
    });

    dialogRef.afterClosed().pipe(
      filter(result => !!result),
      delay(1000)
    ).subscribe(result => {
      // Actualizar la lista de clientes si se agregó uno
      this.getClientes(); 
    });
  }

  editarCliente(idCliente: number): void {
    const dialogRef = this.dialog.open(EditarClienteDialogComponent, {
      width: '1000px',
      data: idCliente
    });
  
    dialogRef.afterClosed().pipe(
      filter(result => !!result),
      delay(500)
    ).subscribe(result => {
      this.getClientes();
    });
  }

  eliminarCliente(idCliente: number) {
    const dialogRef = this.dialog.open(EliminarClienteDialogComponent, {
      width: '550px',
      data: idCliente
    });
  
    dialogRef.afterClosed().pipe(
      filter(result => !!result),
      delay(500)
    ).subscribe(result => {
      this.getClientes();
    });
  }

}