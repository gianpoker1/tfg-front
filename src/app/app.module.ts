import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { JwtModule } from '@auth0/angular-jwt';
import { JwtInterceptor } from './JwtInterceptor';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';


import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ClienteComponent } from './cliente/cliente.component';
import { TrabajadorComponent } from './trabajador/trabajador.component';

import { PaisComponent } from './pais/pais.component';
import { CiudadComponent } from './ciudad/ciudad.component';
import { ProvinciaComponent } from './provincia/provincia.component';
import { ServicioComponent } from './servicio/servicio.component';
import { ProductoComponent } from './producto/producto.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CompraComponent } from './compra/compra.component';
import { ProveedorComponent } from './proovedor/proovedor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditarClienteDialogComponent } from './cliente/editar-cliente-dialog/editar-cliente-dialog.component';
import { EliminarClienteDialogComponent } from './cliente/eliminar-cliente-dialog/eliminar-cliente-dialog.component';
import { EditarTrabajadorDialogComponent } from './trabajador/editar-trabajador-dialog/editar-trabajador-dialog.component';
import { EliminarTrabajadorDialogComponent } from './trabajador/eliminar-trabajador-dialog/eliminar-trabajador-dialog.component';
import { EditarProveedorDialogComponent } from './proovedor/editar-proveedor-dialog/editar-proveedor-dialog.component';
import { EliminarProveedorDialogComponent } from './proovedor/eliminar-proveedor-dialog/eliminar-proveedor-dialog.component';
import { EditarServicioDialogComponent } from './servicio/editar-servicio-dialog/editar-servicio-dialog.component';
import { EliminarServicioDialogComponent } from './servicio/eliminar-servicio-dialog/eliminar-servicio-dialog.component';
import { EditarProductoDialogComponent } from './producto/editar-producto-dialog/editar-producto-dialog.component';
import { EliminarProductoDialogComponent } from './producto/eliminar-producto-dialog/eliminar-producto-dialog.component';
import { EditarCategoriaDialogComponent } from './categoria/editar-categoria-dialog/editar-categoria-dialog.component';
import { EliminarCategoriaDialogComponent } from './categoria/eliminar-categoria-dialog/eliminar-categoria-dialog.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { AgregarServicioDialogComponent } from './servicio/agregar-servicio-dialog/agregar-servicio-dialog.component';
import { AgregarProductoDialogComponent } from './producto/agregar-producto-dialog/agregar-producto-dialog.component';
import { AgregarClienteDialogComponent } from './cliente/agregar-cliente-dialog/agregar-cliente-dialog.component';
import { RegistroUsuarioModalComponent } from './registro-usuario-modal/registro-usuario-modal.component';
import { AgregarPaisDialogComponent } from './pais/agregar-pais-dialog/agregar-pais-dialog.component';
import { EditarPaisDialogComponent } from './pais/editar-pais-dialog/editar-pais-dialog.component';
import { EliminarPaisDialogComponent } from './pais/eliminar-pais-dialog/eliminar-pais-dialog.component';
import { AgregarProvinciaDialogComponent } from './provincia/agregar-provincia-dialog/agregar-provincia-dialog.component';
import { EditarProvinciaDialogComponent } from './provincia/editar-provincia-dialog/editar-provincia-dialog.component';
import { EliminarProvinciaDialogComponent } from './provincia/eliminar-provincia-dialog/eliminar-provincia-dialog.component';
import { AgregarCiudadDialogComponent } from './ciudad/agregar-ciudad-dialog/agregar-ciudad-dialog.component';
import { EditarCiudadDialogComponent } from './ciudad/editar-ciudad-dialog/editar-ciudad-dialog.component';
import { EliminarCiudadDialogComponent } from './ciudad/eliminar-ciudad-dialog/eliminar-ciudad-dialog.component';
import { AgregarCompraDialogComponent } from './compra/agregar-compra-dialog/agregar-compra-dialog.component';
import { EditarCompraDialogComponent } from './compra/editar-compra-dialog/editar-compra-dialog.component';
import { EliminarCompraDialogComponent } from './compra/eliminar-compra-dialog/eliminar-compra-dialog.component';
import { AgregarTrabajadorComponent } from './trabajador/agregar-trabajador/agregar-trabajador.component';
import { ServiciosUsuarioComponent } from './servicio/servicios-usuario/servicios-usuario.component';

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
    ProductoComponent,
    CategoriaComponent,
    CompraComponent,
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
    LoginComponent,
    MenuComponent,
    AgregarServicioDialogComponent,
    AgregarProductoDialogComponent,
    AgregarClienteDialogComponent,
    RegistroUsuarioModalComponent,
    AgregarPaisDialogComponent,
    EditarPaisDialogComponent,
    EliminarPaisDialogComponent,
    AgregarProvinciaDialogComponent,
    EditarProvinciaDialogComponent,
    EliminarProvinciaDialogComponent,
    AgregarCiudadDialogComponent,
    EditarCiudadDialogComponent,
    EliminarCiudadDialogComponent,
    AgregarCompraDialogComponent,
    EditarCompraDialogComponent,
    EliminarCompraDialogComponent,
    AgregarTrabajadorComponent,
    ServiciosUsuarioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatToolbarModule,
    MatButtonModule,
    MatNativeDateModule,
    MatCheckboxModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
        skipWhenExpired: true,
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, 
      useClass: JwtInterceptor, 
      multi: true }
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
