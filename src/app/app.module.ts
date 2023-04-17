import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';

import { HttpClientModule } from '@angular/common/http';
import { ClienteComponent } from './cliente/cliente.component';
import { TrabajadorComponent } from './trabajador/trabajador.component';

import { PaisComponent } from './pais/pais.component';
import { CiudadComponent } from './ciudad/ciudad.component';
import { ProvinciaComponent } from './provincia/provincia.component';
import { ServicioComponent } from './servicio/servicio.component';
import { DetalleServicioComponent } from './detalle-servicio/detalle-servicio.component';
import { ProductoComponent } from './producto/producto.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CompraComponent } from './compra/compra.component';
import { DetalleCompraComponent } from './detalle-compra/detalle-compra.component';
import { ProveedorComponent } from './proovedor/proovedor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditarClienteDialogComponent } from './editar-cliente-dialog/editar-cliente-dialog.component';
import { EliminarClienteDialogComponent } from './eliminar-cliente-dialog/eliminar-cliente-dialog.component';
import { EditarTrabajadorDialogComponent } from './editar-trabajador-dialog/editar-trabajador-dialog.component';
import { EliminarTrabajadorDialogComponent } from './eliminar-trabajador-dialog/eliminar-trabajador-dialog.component';
import { EditarProveedorDialogComponent } from './editar-proveedor-dialog/editar-proveedor-dialog.component';
import { EliminarProveedorDialogComponent } from './eliminar-proveedor-dialog/eliminar-proveedor-dialog.component';
import { EditarServicioDialogComponent } from './editar-servicio-dialog/editar-servicio-dialog.component';
import { EliminarServicioDialogComponent } from './eliminar-servicio-dialog/eliminar-servicio-dialog.component';
import { EditarProductoDialogComponent } from './editar-producto-dialog/editar-producto-dialog.component';
import { EliminarProductoDialogComponent } from './eliminar-producto-dialog/eliminar-producto-dialog.component';
import { EditarCategoriaDialogComponent } from './editar-categoria-dialog/editar-categoria-dialog.component';
import { EliminarCategoriaDialogComponent } from './eliminar-categoria-dialog/eliminar-categoria-dialog.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    TrabajadorComponent,
    ProveedorComponent,
    PaisComponent,
    CiudadComponent,
    ProvinciaComponent,
    ServicioComponent,
    DetalleServicioComponent,
    ProductoComponent,
    CategoriaComponent,
    CompraComponent,
    DetalleCompraComponent,
    EditarClienteDialogComponent,
    EliminarClienteDialogComponent,
    EditarTrabajadorDialogComponent,
    EliminarTrabajadorDialogComponent,
    EditarProveedorDialogComponent,
    EliminarProveedorDialogComponent,
    EditarServicioDialogComponent,
    EliminarServicioDialogComponent,
    EditarProductoDialogComponent,
    EliminarProductoDialogComponent,
    EditarCategoriaDialogComponent,
    EliminarCategoriaDialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
