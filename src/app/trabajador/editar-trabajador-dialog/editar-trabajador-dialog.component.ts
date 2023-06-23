import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TrabajadorService } from '../../services/trabajador.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { Trabajador } from '../../models/trabajador.model';
import { UserTrabajador } from '../../models/user-trabajador';
import { PaisService } from '../../services/pais.service';
import { ProvinciaService } from '../../services/provincia.service';
import { CiudadService } from '../../services/ciudad.service';
import { Pais } from '../../models/pais.model';
import { Provincia } from '../../models/provincia.model';
import { Ciudad } from '../../models/ciudad.model';
import { Rol } from '../../models/rol.model';
import { RolService } from '../../services/rol.service';

@Component({
  selector: 'app-editar-trabajador-dialog',
  templateUrl: './editar-trabajador-dialog.component.html',
  styleUrls: ['./editar-trabajador-dialog.component.css']
})
export class EditarTrabajadorDialogComponent{ 

  usuario: Usuario = new Usuario();
  trabajador: Trabajador = new Trabajador();
  id!: number;
  trabajadorForm: FormGroup;
  paises!: Pais[];
  provincias!: Provincia[];
  ciudades!: Ciudad[];
  roles!: Rol[];
  rolesDeTrabajador!: string[];

  constructor(
    public dialogRef: MatDialogRef<EditarTrabajadorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private trabajadorService: TrabajadorService,
    private paisService: PaisService,
    private provinciaService: ProvinciaService,
    private ciudadService: CiudadService,
    private rolService: RolService
  ) {
    this.trabajadorForm = this.formBuilder.group({
      username: ['', Validators.required],
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      pais: ['', Validators.required],
      ciudad: ['', Validators.required],
      provincia: ['', Validators.required],
      tipo: ['', Validators.required],
      roles: [[], Validators.required]
    });
   }



   ngOnInit(): void {
    
    this.trabajadorService.obtenerTrabajadorPorId(this.data).subscribe(userTrabajador =>{
      this.usuario = userTrabajador.usuario;
      this.trabajador = userTrabajador.trabajador;
      this.rolesDeTrabajador = userTrabajador.roles;
      this.trabajadorForm.patchValue({
        username: this.usuario.userName,
        dni: this.usuario.dni,
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        telefono: this.usuario.telefono,
        direccion: this.usuario.direccion,
        pais: this.usuario.pais,
        ciudad: this.usuario.ciudad,
        provincia: this.usuario.provincia,
        tipo: this.trabajador.tipo,
        roles: this.rolesDeTrabajador
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

    this.rolService.findAll().subscribe(roles => {
      this.roles = roles;
    });
   }

   

  guardarCambios(): void {
    const formValue = this.trabajadorForm.value;

    this.usuario.userName = formValue.username;
    this.usuario.dni = formValue.dni;
    this.usuario.nombre = formValue.nombre;
    this.usuario.apellido = formValue.apellido;
    this.usuario.telefono = formValue.telefono;
    this.usuario.direccion = formValue.direccion;
    this.usuario.pais = formValue.pais;
    this.usuario.ciudad = formValue.ciudad;
    this.usuario.provincia = formValue.provincia;
    this.trabajador.tipo = formValue.tipo;
    


    const userTrabajador : UserTrabajador={
      usuario: this.usuario,
      trabajador: this.trabajador,
      roles: this.rolesDeTrabajador
    };
    this.trabajadorService.actualizarTrabajador(this.trabajador.idTrabajador, this.usuario.id, userTrabajador)
    .subscribe(() => {
      console.log("Trabajador actualizado");
    }, error => {
      console.log('Error al actualizar trabajador.', error);
    });
    this.dialogRef.close(true);
  }

  cerrarDialog(): void {
    
    this.dialogRef.close(false); // Cerrar el diálogo sin actualizar la lista de trabajadores
  }



}