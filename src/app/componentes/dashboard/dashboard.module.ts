import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CrearUsuariosComponent } from './usuarios/crear-usuarios/crear-usuarios.component';
import { EditarUsuariosComponent } from './usuarios/editar-usuarios/editar-usuarios.component';
import { VisualizarUsuariosComponent } from './usuarios/visualizar-usuarios/visualizar-usuarios.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    MenuComponent,
    UsuariosComponent,
    CrearUsuariosComponent,
    EditarUsuariosComponent,
    VisualizarUsuariosComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
