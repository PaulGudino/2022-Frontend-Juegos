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
import { MensajesErrorComponent } from './mensajes-error/mensajes-error.component';
import { RolesComponent } from './roles/roles.component';
import { RolesCrearComponent } from './roles/roles-crear/roles-crear.component';
import { RolesEditarComponent } from './roles/roles-editar/roles-editar.component';
import { PermisosRolesComponent } from './permisos/permisos-roles/permisos-roles.component';
import { CambiarContraseniaComponent } from './inicio/cambiar-Contrasenia/cambiar-contrasenia/cambiar-contrasenia.component';
import { ComponentesCompartidosModule } from 'src/app/componentes-compartidos/componentes-compartidos/componentes-compartidos.module';
import { UsuariosEliminadosComponent } from './usuarios/usuarios-eliminados/usuarios-eliminados/usuarios-eliminados.component';
import { ClientsComponent } from './clients/clients.component';
import { AwardsComponent } from './awards/awards.component';
import { CreateClientComponent } from './clients/create-client/create-client.component';
import { ViewAwardsComponent } from './awards/view-awards/view-awards.component';
import { CreateAwardsComponent } from './awards/create-awards/create-awards.component';
import { EditAwardsComponent } from './awards/edit-awards/edit-awards.component';
import { ProbabilidadesComponent } from './probabilidades/probabilidades.component';



@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    MenuComponent,
    UsuariosComponent,
    CrearUsuariosComponent,
    EditarUsuariosComponent,
    VisualizarUsuariosComponent,
    MensajesErrorComponent,
    RolesComponent,
    RolesCrearComponent,
    RolesEditarComponent,
    PermisosRolesComponent,
    CambiarContraseniaComponent,
    UsuariosEliminadosComponent,
    ClientsComponent,
    AwardsComponent,
    CreateClientComponent,
    ViewAwardsComponent,
    CreateAwardsComponent,
    EditAwardsComponent,
    ProbabilidadesComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    DashboardRoutingModule,
    ComponentesCompartidosModule
  ]
})
export class DashboardModule { }
