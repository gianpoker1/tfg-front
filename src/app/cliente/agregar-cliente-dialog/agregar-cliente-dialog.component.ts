import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Pais } from '../../models/pais.model';
import { Provincia } from '../../models/provincia.model';
import { Ciudad } from '../../models/ciudad.model';
import { PaisService } from '../../services/pais.service';
import { ProvinciaService } from '../../services/provincia.service';
import { CiudadService } from '../../services/ciudad.service';
import { Cliente } from '../../models/cliente.model';
import { Usuario } from '../../models/usuario.model';
import { RegistroServiceService } from '../../services/registro-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-agregar-cliente-dialog',
  templateUrl: './agregar-cliente-dialog.component.html',
  styleUrls: ['./agregar-cliente-dialog.component.css']
})
export class AgregarClienteDialogComponent {

  nuevoClienteForm!: FormGroup;
  paises!: Pais[];
  provincias!: Provincia[];
  ciudades!: Ciudad[];
  mensajeError!: string;
  

  constructor(
    public dialogRef: MatDialogRef<AgregarClienteDialogComponent>,
    private formBuilder: FormBuilder,
    private registroervice: RegistroServiceService,
     private paisService: PaisService,
     private provinciaService: ProvinciaService,
      private ciudadService: CiudadService
  ) {}

  ngOnInit(): void {
    this.nuevoClienteForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      dni: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      pais: ['', Validators.required],
      ciudad: ['', Validators.required],
      provincia: ['', Validators.required],
    });
    this.getPaises();
    this.getProvincias();
    this.getCiudades();

  }

  agregarCliente(): void {
    if(this.nuevoClienteForm.valid){
      const nuevoCliente : Cliente = {
        idCliente: 0,
        idUsuario: 0
      };
      const nuevoUsuario: Usuario = {
        id: 0,
        userName: this.nuevoClienteForm.get('userName')?.value,
        password: this.nuevoClienteForm.get('password')?.value,
        dni: this.nuevoClienteForm.get('dni')?.value,
        nombre: this.nuevoClienteForm.get('nombre')?.value,
        apellido: this.nuevoClienteForm.get('apellido')?.value,
        telefono: this.nuevoClienteForm.get('telefono')?.value,
        direccion: this.nuevoClienteForm.get('direccion')?.value,
        pais: this.nuevoClienteForm.get('pais')?.value,
        provincia: this.nuevoClienteForm.get('provincia')?.value,
        ciudad: this.nuevoClienteForm.get('ciudad')?.value,
        tipo: '',
        roles: []
      };

      console.log('USUARIO NUEVO JSON: ', JSON.stringify(nuevoUsuario));
      this.registroervice.save(nuevoUsuario, '').subscribe(usuario => {
        console.log('Usuario agregado');
      }, error  => {
        console.log('Error al guardar usuario. ', error);
        this.mensajeError = error.message;
      });
      this.dialogRef.close(true);
    }
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

  getPaises() {
    this.paisService.obtenerPaises().subscribe(paises => {
      this.paises = paises;
    });
  }

  getProvincias() {
    this.provinciaService.obtenerProvincias().subscribe(provincias => {
      this.provincias = provincias;
    });
  }

  getCiudades() {
    this.ciudadService.obtenerCiudades().subscribe(ciudades => {
      this.ciudades = ciudades;
    });
  }
}
