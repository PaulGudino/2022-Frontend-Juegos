import { PermisosRolesComponent } from './permisos/permisos-roles/permisos-roles.component';
import { RolesEditarComponent } from './roles/roles-editar/roles-editar.component';
import { EditarUsuariosComponent } from './usuarios/editar-usuarios/editar-usuarios.component';
import { InicioComponent } from './inicio/inicio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CrearUsuariosComponent } from './usuarios/crear-usuarios/crear-usuarios.component';
import { VisualizarUsuariosComponent } from './usuarios/visualizar-usuarios/visualizar-usuarios.component';
import { RolesComponent } from './roles/roles.component';
import { RolesCrearComponent } from './roles/roles-crear/roles-crear.component';

//Guardianes

import { CambiarContraseniaComponent } from './inicio/cambiar-Contrasenia/cambiar-contrasenia/cambiar-contrasenia.component';
import { UsuariosEliminadosComponent } from './usuarios/usuarios-eliminados/usuarios-eliminados/usuarios-eliminados.component';
import { ClientsComponent } from './clients/clients.component';
import { AwardsComponent } from './awards/awards.component';
import { CreateClientComponent } from './clients/create-client/create-client.component';
import { CreateAwardsComponent } from './awards/create-awards/create-awards.component';
import { EditAwardsComponent } from './awards/edit-awards/edit-awards.component';
import { ViewAwardsComponent } from './awards/view-awards/view-awards.component';
import {ProbabilidadesComponent} from './probabilidades/probabilidades.component'
import { PermissionsGuard } from 'src/app/guardianes/Permissions/permissions.guard';

const routes: Routes = [
  {path: '', component: DashboardComponent, children: [
    {path: '', component: InicioComponent},
    {path: 'cambiar-contraseña', component: CambiarContraseniaComponent },
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'usuarios/crear', component: CrearUsuariosComponent, canActivate: [PermissionsGuard], data: {Permiso_id: 1}},
    {path: 'usuarios/editar/:id', component: EditarUsuariosComponent, canActivate: [PermissionsGuard], data: {Permiso_id: 2}},
    {path: 'usuarios/visualizar/:id', component: VisualizarUsuariosComponent, canActivate: [PermissionsGuard], data: {Permiso_id: 3}},
    {path: 'usuarios/eliminados', component: UsuariosEliminadosComponent},
    {path: 'roles', component: RolesComponent},
    {path: 'roles/crear', component: RolesCrearComponent, canActivate: [PermissionsGuard], data: {Permiso_id: 6}},
    {path: 'roles/editar/:id', component: RolesEditarComponent, canActivate: [PermissionsGuard], data: {Permiso_id: 7}},
    {path: 'roles/permisos/:id', component: PermisosRolesComponent, canActivate: [PermissionsGuard], data: {Permiso_id: 8}},
    {path: 'clientes', component : ClientsComponent},
    {path: 'clientes/crear', component: CreateClientComponent},
    {path: 'premios', component : AwardsComponent},
    {path: 'premios/crear', component: CreateAwardsComponent, canActivate: [PermissionsGuard], data: {Permiso_id: 14}},
    {path: 'premios/editar/:id', component: EditAwardsComponent, canActivate: [PermissionsGuard], data: {Permiso_id: 15}},
    {path: 'premios/visualizar/:id', component: ViewAwardsComponent, canActivate: [PermissionsGuard], data: {Permiso_id: 16}},
    {path: 'probabilidades', component : ProbabilidadesComponent},

  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
