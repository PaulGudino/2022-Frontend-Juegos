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

import { UsuarioscrearGuard } from 'src/app/guardianes/usuarios/crear/usuarioscrear.guard';
import { UsuarioeditarGuard } from './../../guardianes/usuarios/editar/usuarioeditar.guard';
import { UsuarioverGuard } from './../../guardianes/usuarios/ver/usuariover.guard';
import { RolesverGuard } from './../../guardianes/roles/ver/rolesver.guard';
import { RoleseditarGuard } from './../../guardianes/roles/editar/roleseditar.guard';
import { RolescrearGuard } from './../../guardianes/roles/crear/rolescrear.guard';
import { CambiarContraseniaComponent } from './inicio/cambiar-Contrasenia/cambiar-contrasenia/cambiar-contrasenia.component';


const routes: Routes = [
  {path: '', component: DashboardComponent, children: [
    {path: '', component: InicioComponent},
    { path: 'cambiar-contraseña', component: CambiarContraseniaComponent },
    {path: 'usuarios', component: UsuariosComponent},
    {path: 'usuarios/crear', component: CrearUsuariosComponent, canActivate: [UsuarioscrearGuard]},
    {path: 'usuarios/editar/:id', component: EditarUsuariosComponent, canActivate: [UsuarioeditarGuard]},
    {path: 'usuarios/visualizar/:id', component: VisualizarUsuariosComponent, canActivate: [UsuarioverGuard]},
    {path: 'roles', component: RolesComponent},
    {path: 'roles/crear', component: RolesCrearComponent, canActivate: [RolescrearGuard]},
    {path: 'roles/editar/:id', component: RolesEditarComponent, canActivate: [RoleseditarGuard]},
    {path: 'roles/permisos/:id', component: PermisosRolesComponent, canActivate: [RolesverGuard]},
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
