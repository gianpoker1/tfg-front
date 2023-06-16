import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../models/usuario.model';
import { RegistroServiceService } from '../services/registro-service.service';
import { AuthService } from '../services/auth.service';
import { Pais } from '../models/pais.model';
import { Provincia } from '../models/provincia.model';
import { Ciudad } from '../models/ciudad.model';
import { PaisService } from '../services/pais.service';
import { ProvinciaService } from '../services/provincia.service';
import { CiudadService } from '../services/ciudad.service';

@Component({
  selector: 'app-registro-usuario-modal',
  templateUrl: './registro-usuario-modal.component.html',
  styleUrls: ['./registro-usuario-modal.component.css']
})
export class RegistroUsuarioModalComponent implements OnInit {

  usuarioForm!: FormGroup;
  paises!: Pais[];
  provincias!: Provincia[];
  ciudades!: Ciudad[];

  constructor(
    public dialogRef: MatDialogRef<RegistroUsuarioModalComponent>,
    private formBuilder: FormBuilder,
    private registroService: RegistroServiceService,
    private authService: AuthService,
    private paisService: PaisService,
    private provinciaService: ProvinciaService,
    private ciudadService: CiudadService
  ) { }

  ngOnInit(): void {
    this.usuarioForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      pais: [[], Validators.required],
      provincia: [[], Validators.required],
      ciudad: [[], Validators.required],
      tipo: [''],
    });
    this.getPaises();
    this.getProvincias();
    this.getCiudades();
  }

  registrarUsuario(): void {
    if (this.usuarioForm.valid) {
      const usuario: Usuario = this.usuarioForm.value;
      const tipo: string = this.usuarioForm.get('tipo')?.value;
      const payload = {
        usuario: { ...usuario },
        tipo: tipo
      };
      console.log('Usuario a registrar', JSON.stringify(payload));
      this.registroService.save(usuario, tipo).subscribe(savedUsuario => {
        console.log('Usuario registrado correctamente', savedUsuario);
        this.dialogRef.close();
      }, error => {
        console.error('Error al registrar usuario', error);
      });

    }
  }

  // Obtener el usuario actual y su rol
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  cerrarModal(): void {
    this.dialogRef.close();
  }

  getPaises(): void {
    this.paisService.obtenerPaises().subscribe(pais => {
      this.paises = pais;
    });
  }

  getProvincias(): void {
    this.provinciaService.obtenerProvincias().subscribe(provincia => {
      this.provincias = provincia;
    });
  }

  getCiudades(): void {
    this.ciudadService.obtenerCiudades().subscribe(ciudad => {
      this.ciudades = ciudad;
    });
  }

}
