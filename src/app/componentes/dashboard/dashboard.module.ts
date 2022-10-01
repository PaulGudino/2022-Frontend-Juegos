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
import { RolesEditarComponent } from './roles/roles-editar/roles-editar.component';
import { RolesConfirmarEditarComponent } from './roles/roles-confirmar-editar/roles-confirmar-editar.component';
import { RolesConfirmarEliminarComponent } from './roles/roles-confirmar-eliminar/roles-confirmar-eliminar.component';
import { PermisosRolesComponent } from './permisos/permisos-roles/permisos-roles.component';
import { PermisosConfirmarComponent } from './permisos/permisos-confirmar/permisos-confirmar.component';
import { CambiarContraseniaComponent } from './inicio/cambiar-Contrasenia/cambiar-contrasenia/cambiar-contrasenia.component';
import { ConfirmarCambiarContraseniaComponent } from './inicio/confirmar-cambiar-Contrasenia/confirmar-cambiar-contrasenia/confirmar-cambiar-contrasenia.component';
import { ComponentesCompartidosModule } from 'src/app/componentes-compartidos/componentes-compartidos/componentes-compartidos.module';


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
    RolesEditarComponent,
    RolesConfirmarEditarComponent,
    RolesConfirmarEliminarComponent,
    PermisosRolesComponent,
    PermisosConfirmarComponent,
    CambiarContraseniaComponent,
    ConfirmarCambiarContraseniaComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    DashboardRoutingModule,
    ComponentesCompartidosModule
  ]
})
export class DashboardModule { }
