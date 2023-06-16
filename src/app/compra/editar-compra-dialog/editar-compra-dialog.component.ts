import { Component, Inject } from '@angular/core';
import { Compra } from '../../models/compra.model';
import { Usuario } from '../../models/usuario.model';
import { Producto } from '../../models/producto.model';
import { Proovedor } from '../../models/proovedor.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DetalleCompra } from '../../models/detalle-compra';
import { UserTrabajador } from '../../models/user-trabajador';
import { CompraService } from '../../services/compra.service';
import { ProovedorService } from '../../services/proovedor.service';
import { ProductoService } from '../../services/producto.service';
import { UsuarioService } from '../../services/usuario.service';
import { TrabajadorService } from '../../services/trabajador.service';
import { Trabajador } from '../../models/trabajador.model';


@Component({
  selector: 'app-editar-compra-dialog',
  templateUrl: './editar-compra-dialog.component.html',
  styleUrls: ['./editar-compra-dialog.component.css']
})
export class EditarCompraDialogComponent {

  compra!: Compra;
  userTrabajador!: UserTrabajador;
  usuario!: Usuario;
  producto!: Producto;
  proovedor!: Proovedor;
  compraForm!: FormGroup;
  proovedores: Proovedor[] = [];
  productos: Producto[] = [];
  usuarios: Usuario[] = [];
  trabajadores: Trabajador[] = [];
  nombreTrabajador!: string;

  constructor(
    protected dialogRef: MatDialogRef<EditarCompraDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DetalleCompra,
    private formBuilder: FormBuilder,
    private compraService: CompraService,
    private proovedorService: ProovedorService,
    private productoService: ProductoService,
    private trabajadorService: TrabajadorService,
    private usuarioService: UsuarioService
  ) { 
      this.compraForm = this.formBuilder.group({
        fecha: ['', Validators.required],
        cantidad: ['', Validators.required],
        precioUnidad: ['', Validators.required],
        total: 0,
        idProovedor: ['', Validators.required],
        idProducto: ['', Validators.required],
        idTrabajador: ['', Validators.required]
      });
    }

    ngOnInit(): void {
      this.compra = this.data.compra;
      this.proovedor = this.data.proovedor;
      this.producto = this.data.producto;
      this.userTrabajador = this.data.trabajador;
      this.usuario = this.userTrabajador.usuario;
      this.compraForm.patchValue({
        fecha: this.compra.fecha,
        cantidad: this.compra.cantidad,
        precioUnidad: this.compra.precioUnidad,
        total: 0,
        idProovedor: this.proovedor.idProovedor,
        idProducto: this.producto.idProducto,
        idTrabajador: this.userTrabajador.trabajador.idTrabajador
      });

      this.proovedorService.obtenerProovedores().subscribe(proovedores => {
        this.proovedores = proovedores;
      });
      this.productoService.obtenerProductos().subscribe(productos => {
        this.productos = productos;
      });
      
      this.usuarioService.findAll().subscribe(usuarios => {
        this.usuarios = usuarios;
      });
      this.trabajadorService.obtenerTrabajadores().subscribe(trabajadores => {
        this.trabajadores = trabajadores;
      });
    }
    


    guardarCambios(): void {
      const formValue = this.compraForm.value;

      this.compra.fecha = formValue.fecha;
      this.compra.cantidad = formValue.cantidad;
      this.compra.precioUnidad = formValue.precioUnidad;
      this.compra.total = 0,
      this.compra.idProovedor = formValue.idProovedor;
      this.compra.idProducto = formValue.idProducto;
      this.compra.idTrabajador = formValue.idTrabajador;

      this.compraService.actualizarCompra(this.compra.idCompra, this.compra)
        .subscribe(() => {
          console.log('Compra actualizada');
        }, error => {
          console.error('Error al actualizar la compra', error);
        });
      this.dialogRef.close(true);
    }

    cerrarDialog(): void {
      this.dialogRef.close(false);
    }

    obtenerNombreTrabajador(idUsuario: number): string {
      const usuario= this.usuarios.find(usuario => usuario.id == idUsuario);
      return usuario?.nombre ?? '';
    }
      


}
