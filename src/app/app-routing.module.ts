import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './cliente/cliente.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { CiudadComponent } from './ciudad/ciudad.component';
import { CompraComponent } from './compra/compra.component';
import { ServicioComponent } from './servicio/servicio.component';
import { TrabajadorComponent } from './trabajador/trabajador.component';
import { PaisComponent } from './pais/pais.component';
import { ProductoComponent } from './producto/producto.component';
import { ProveedorComponent } from './proovedor/proovedor.component';
import { ProvinciaComponent } from './provincia/provincia.component';
import { LoginComponent } from './login/login.component';
import { ServiciosUsuarioComponent } from './servicio/servicios-usuario/servicios-usuario.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'categorias', component: CategoriaComponent },
  { path: 'ciudades', component: CiudadComponent },
  { path: 'compras', component: CompraComponent },
  { path: 'servicios', component: ServicioComponent },
  { path: 'trabajadores', component: TrabajadorComponent },
  { path: 'pais', component: PaisComponent},
  { path: 'producto', component: ProductoComponent },
  { path: 'proovedores', component: ProveedorComponent },
  { path: 'provincias', component: ProvinciaComponent },
  { path: 'usuarioServicio', component: ServiciosUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
