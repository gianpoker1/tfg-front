import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { Cliente } from '../../models/cliente.model';
import { Pais } from '../../models/pais.model';
import { Provincia } from '../../models/provincia.model';
import { Ciudad } from '../../models/ciudad.model';
import { ClienteService } from '../../services/cliente.service';
import { PaisService } from '../../services/pais.service';
import { ProvinciaService } from '../../services/provincia.service';
import { CiudadService } from '../../services/ciudad.service';
import { UserCliente } from '../../models/user-cliente';

@Component({
  selector: 'app-editar-cliente-dialog',
  templateUrl: './editar-cliente-dialog.component.html',
  styleUrls: ['./editar-cliente-dialog.component.css']
})
export class EditarClienteDialogComponent {

  usuario: Usuario = new Usuario();
  cliente: Cliente = new Cliente();
  id!: number;
  clienteForm: FormGroup;
  paises!: Pais[];
  provincias!: Provincia[];
  ciudades!: Ciudad[];

  constructor(
    protected dialogRef: MatDialogRef<EditarClienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private paisService: PaisService,
    private provinciaService: ProvinciaService,
    private ciudadService: CiudadService
  ) {
    this.clienteForm = this.formBuilder.group({
      username: ['', Validators.required],
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      pais: ['', Validators.required],
      ciudad: ['', Validators.required],
      provincia: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.clienteService.obtenerClientePorId(this.data).subscribe(userCliente => {
      this.cliente = userCliente.cliente;
      this.usuario = userCliente.usuario;
      this.clienteForm.patchValue({
        username: this.usuario.userName,
        dni: this.usuario.dni,
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        telefono: this.usuario.telefono,
        direccion: this.usuario.direccion,
        pais: this.usuario.pais,
        ciudad: this.usuario.ciudad,
        provincia: this.usuario.provincia
      });
    });
    this.paisService.obtenerPaises().subscribe(paises => {
      this.paises = paises;
    });
    this.provinciaService.obtenerProvincias().subscribe(provincias => {
      this.provincias = provincias;
    });
    this.ciudadService.obtenerCiudades().subscribe(ciudades => {
      this.ciudades = ciudades;
    });
  }

  guardarCambios(): void {
    const formValue = this.clienteForm.value;

    this.usuario.userName = formValue.username;
    this.usuario.dni = formValue.dni;
    this.usuario.nombre = formValue.nombre;
    this.usuario.apellido = formValue.apellido;
    this.usuario.telefono = formValue.telefono;
    this.usuario.direccion = formValue.direccion;
    this.usuario.pais = formValue.pais;
    this.usuario.ciudad = formValue.ciudad;
    this.usuario.provincia = formValue.provincia;

    const userCliente: UserCliente = {
      usuario: this.usuario,
      cliente: this.cliente
    };

    this.clienteService.actualizarCliente(this.cliente.idCliente, this.usuario.id, userCliente)
      .subscribe(() => {
        console.log('Cliente actualizado');
      }, error => {
        console.log('Error al actualizar cliente. ', error);
      });
    this.dialogRef.close(true);
  }

  cerrarDialog(): void {
    this.dialogRef.close(false);
  }

}
