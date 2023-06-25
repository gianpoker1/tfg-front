import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario.model';
import { Rol } from '../../models/rol.model';
import { MatDialogRef } from '@angular/material/dialog';
import { RolService } from '../../services/rol.service';
import { TrabajadorService } from '../../services/trabajador.service';
import { UsuarioService } from '../../services/usuario.service';
import { TrabajadorRol } from '../../models/trabajador-rol';

@Component({
  selector: 'app-agregar-trabajador',
  templateUrl: './agregar-trabajador.component.html',
  styleUrls: ['./agregar-trabajador.component.css']
})
export class AgregarTrabajadorComponent {

  nuevoTrajadorForm!: FormGroup;
  usuarios!: Usuario[];
  roles!: Rol[];

  constructor(
    protected dialogRef: MatDialogRef<AgregarTrabajadorComponent>,
    private formBuilder: FormBuilder,
    private trabajadorService: TrabajadorService,
    private usuarioService: UsuarioService,
    private rolService: RolService
  ) { }

  ngOnInit(): void {
    this.nuevoTrajadorForm = this.formBuilder.group({
      tipo: ['', Validators.required],
      idUsuario: ['', Validators.required],
      roles: [[], Validators.required]
    });
    this.getUsuarios();
    this.getRoles();
  }

  agregarTrabajador(): void {
    if(this.nuevoTrajadorForm.valid){
      const nuevoTrabajador: TrabajadorRol = {
        trabajador: {
          idTrabajador: 0,
          tipo: this.nuevoTrajadorForm.get('tipo')?.value,
          idUsuario: this.nuevoTrajadorForm.get('idUsuario')?.value
        },
        roles: this.nuevoTrajadorForm.get('roles')?.value
      };

      console.log('TRABAJADOR JSON: ', JSON.stringify(nuevoTrabajador));

      this.trabajadorService.agregarTrabajador(nuevoTrabajador).subscribe(
        () => {
          console.log('Trabajador agregado con exito');
        },error => {
          console.log('Error al guardar trabajador', error);
        });
        this.dialogRef.close(true);
    }
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

  getUsuarios(): void {
    this.usuarioService.findAll().subscribe(
      data => {
        this.usuarios = data;
      }
    );
  }

  getRoles(): void {
    this.rolService.findAll().subscribe(
      data => {
        this.roles = data;
      }
    );
  }
  

}
