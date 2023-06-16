import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Compra } from '../../models/compra.model';
import { Trabajador } from '../../models/trabajador.model';
import { Proovedor } from '../../models/proovedor.model';
import { Producto } from '../../models/producto.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompraService } from '../../services/compra.service';
import { ProductoService } from '../../services/producto.service';
import { TrabajadorService } from '../../services/trabajador.service';
import { ProovedorService } from '../../services/proovedor.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-agregar-compra-dialog',
  templateUrl: './agregar-compra-dialog.component.html',
  styleUrls: ['./agregar-compra-dialog.component.css']
})
export class AgregarCompraDialogComponent {

  nuevaCompraForm!: FormGroup;
  compra!: Compra;
  trabajadores!: Trabajador[];
  proovedores!: Proovedor[];
  productos!: Producto[];
  trabajador!: Trabajador;
  usuario!: Usuario;
  usuarios!: Usuario[];

  constructor(
    private dialogRef: MatDialogRef<AgregarCompraDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private compraService: CompraService,
    private productoService: ProductoService,
    private trabajadorService: TrabajadorService,
    private proovedorService: ProovedorService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.nuevaCompraForm = this.formBuilder.group({
      fecha: ['', Validators.required],
      cantidad: ['', Validators.required],
      precioUnidad: ['', Validators.required],
      total: 0,
      idProovedor: ['', Validators.required],
      idProducto: ['', Validators.required],
      idTrabajador: ['', Validators.required]
    });
    this.getTrabajadores();
    this.getProovedores();
    this.getProductos();
  }

  agregarCompra(): void {
    if(this.nuevaCompraForm.valid){
      const nuevaCompra: Compra = {
        idCompra: 0,
        fecha: this.nuevaCompraForm.get('fecha')?.value,
        cantidad: this.nuevaCompraForm.get('cantidad')?.value,
        precioUnidad: this.nuevaCompraForm.get('precioUnidad')?.value,
        total: this.nuevaCompraForm.get('total')?.value,
        idProovedor: this.nuevaCompraForm.get('idProovedor')?.value,
        idProducto: this.nuevaCompraForm.get('idProducto')?.value,
        idTrabajador: this.nuevaCompraForm.get('idTrabajador')?.value
      };
    
      this.compraService.agregarCompra(nuevaCompra).subscribe(() => {
        console.log('Compra agregada');
      }, error => {
        console.error('Error al guardar usuario. ', error);
      });
      this.dialogRef.close(true);
    }
  }

  cancelar(): void {
    this.dialogRef.close(false);
  }

  getTrabajadores(): void {
    this.trabajadorService.obtenerTrabajadores().subscribe(trabajadores => {
      this.trabajadores = trabajadores;
      const requests = this.trabajadores.map(trabajador => {
        return this.usuarioService.findById(trabajador.idUsuario);
      });
      forkJoin(requests).subscribe(usuarios => {
        this.usuarios = usuarios;
      });
    });
    
  }
  obtenerNombreTrabajador(idUser: number): string {
    const nombre = this.usuarios?.find(usuario => usuario.id === idUser)!.nombre;
    return nombre;
  }

  getProovedores(): void {
    this.proovedorService.obtenerProovedores().subscribe(proovedores => {
      this.proovedores = proovedores;
    });
  }

  getProductos(): void {
    this.productoService.obtenerProductos().subscribe(productos => {
      this.productos = productos;
    });
  }

  
}
