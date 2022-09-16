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
import { ConfirmacionCrearComponent } from './usuarios/confirmacion-crear/confirmacion-crear.component';
import { ConfirmacionEditarComponent } from './usuarios/confirmacion-editar/confirmacion-editar.component';
import { ConfirmacionEliminarComponent } from './usuarios/confirmacion-eliminar/confirmacion-eliminar.component';
import { MensajesErrorComponent } from './mensajes-error/mensajes-error.component';
import { RolesComponent } from './roles/roles.component';
import { RolesCrearComponent } from './roles/roles-crear/roles-crear.component';
import { RolesConfirmarCrearComponent } from './roles/roles-confirmar-crear/roles-confirmar-crear.component';


@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    MenuComponent,
    UsuariosComponent,
    CrearUsuariosComponent,
    EditarUsuariosComponent,
    VisualizarUsuariosComponent,
    ConfirmacionCrearComponent,
    ConfirmacionEditarComponent,
    ConfirmacionEliminarComponent,
    MensajesErrorComponent,
    RolesComponent,
    RolesCrearComponent,
    RolesConfirmarCrearComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
