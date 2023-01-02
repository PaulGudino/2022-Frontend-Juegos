import { PublicityGameComponent } from './publicity-game/publicity-game.component';
import { WinnerDesignComponent } from './winner-design/winner-design.component';
import { EditAwardsConditionComponent } from './awards-condition/edit-awards-condition/edit-awards-condition.component';
import { AdministrationGuard } from './../../guardianes/Administration/administration.guard';
import { PermisosRolesComponent } from './permisos/permisos-roles/permisos-roles.component';
import { RolesEditarComponent } from './roles/roles-editar/roles-editar.component';
import { EditarUsuariosComponent } from './user/edit-user/edit-user.component';
import { InicioComponent } from './inicio/inicio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { UsuariosComponent } from './user/user.component';
import { CrearUsuariosComponent } from './user/create-user/create-user.component';
import { VisualizarUsuariosComponent } from './user/view-user/view-user.component';
import { RolesComponent } from './roles/roles.component';
import { RolesCrearComponent } from './roles/roles-crear/roles-crear.component';
import { TicketsComponent } from './tickets/tickets.component';
import { CreateTicketComponent } from './tickets/create-ticket/create-ticket.component';
import { ViewTicketComponent } from './tickets/view-ticket/view-ticket.component';
import { GameSelectionComponent } from './game-selection/game-selection.component';
import { PublicityComponent } from './publicity/publicity.component';
import { TopPublicityComponent } from './publicity/top-publicity/top-publicity.component';
import { BottomPublicityComponent } from './publicity/bottom-publicity/bottom-publicity.component';


import { CambiarContraseniaComponent } from './inicio/cambiar-Contrasenia/cambiar-contrasenia/cambiar-contrasenia.component';
import { ClientsComponent } from './clients/clients.component';
import { AwardsComponent } from './awards/awards.component';
import { CreateClientComponent } from './clients/create-client/create-client.component';
import { CreateAwardsComponent } from './awards/create-awards/create-awards.component';
import { EditAwardsComponent } from './awards/edit-awards/edit-awards.component';
import { ViewAwardsComponent } from './awards/view-awards/view-awards.component';
import { ProbabilidadesComponent } from './probabilidades/probabilidades.component';
import { PermissionsGuard } from 'src/app/guardianes/Permissions/permissions.guard';
import { InicioGuard } from 'src/app/guardianes/inicio/inicio.guard';
import { EditClientComponent } from './clients/edit-client/edit-client.component';
import { ViewClientComponent } from './clients/view-client/view-client.component';
import { GameDateComponent } from './game-date/game-date.component';
import { AwardsConditionComponent } from './awards-condition/awards-condition.component';
import { CreateAwardsConditionComponent } from './awards-condition/create-awards-condition/create-awards-condition.component';
import { ViewAwardsConditionComponent } from './awards-condition/view-awards-condition/view-awards-condition.component';
import { SaveScreenComponent } from './save-screen/save-screen.component';
import { ScanCodeComponent } from './scan-code/scan-code.component';
import { DesignComponent } from './design/design.component';
import { TicketConfigurationComponent } from './ticket-configuration/ticket-configuration.component';
import { GameSummaryComponent } from './game-summary/game-summary.component';

const routes: Routes = [
   {
      path: '',
      component: DashboardComponent,
      children: [
         { path: '', component: InicioComponent },
         { path: 'cambiar-contraseña', component: CambiarContraseniaComponent },
         // Usuarios Administradores
         {
            path: 'usuarios',
            component: UsuariosComponent,
            canActivate: [InicioGuard, AdministrationGuard],
         },
         {
            path: 'usuarios/crear',
            component: CrearUsuariosComponent,
            canActivate: [InicioGuard, AdministrationGuard],
         },
         {
            path: 'usuarios/visualizar/:id',
            component: VisualizarUsuariosComponent,
            canActivate: [InicioGuard, AdministrationGuard],
         },
         {
            path: 'usuarios/editar/:id',
            component: EditarUsuariosComponent,
            canActivate: [InicioGuard, AdministrationGuard],
         },
         {
            path: 'roles',
            component: RolesComponent,
            canActivate: [InicioGuard, AdministrationGuard],
         },
         {
            path: 'roles/crear',
            component: RolesCrearComponent,
            canActivate: [InicioGuard, AdministrationGuard],
         },
         {
            path: 'roles/permisos/:id',
            component: PermisosRolesComponent,
            canActivate: [InicioGuard, AdministrationGuard],
         },
         {
            path: 'roles/editar/:id',
            component: RolesEditarComponent,
            canActivate: [InicioGuard, AdministrationGuard],
         },

         // Clientes
         {
            path: 'clientes',
            component: ClientsComponent,
            canActivate: [InicioGuard],
         },
         {
            path: 'clientes/crear',
            component: CreateClientComponent,
            canActivate: [PermissionsGuard, InicioGuard],
            data: { Permiso_nombre: 'Crear Cliente' },
         },
         {
            path: 'clientes/vizualizar/:id',
            component: ViewClientComponent,
            canActivate: [PermissionsGuard, InicioGuard],
            data: { Permiso_nombre: 'Ver Cliente' },
         },
         {
            path: 'clientes/editar/:id',
            component: EditClientComponent,
            canActivate: [PermissionsGuard, InicioGuard],
            data: { Permiso_nombre: 'Editar Cliente' },
         },

         // Tickets
         {
            path: 'tickets/configuracion',
            component: TicketConfigurationComponent,
            canActivate: [PermissionsGuard, InicioGuard],
            data: { Permiso_nombre: 'Editar Diseño del Ticket' },
         },
         {
            path: 'tickets',
            component: TicketsComponent,
            canActivate: [InicioGuard],
         },
         {
            path: 'tickets/crear',
            component: CreateTicketComponent,
            canActivate: [PermissionsGuard, InicioGuard],
            data: { Permiso_nombre: 'Crear Ticket' },
         },
         {
            path: 'tickets/vizualizar/:id',
            component: ViewTicketComponent,
            canActivate: [PermissionsGuard, InicioGuard],
            data: { Permiso_nombre: 'Ver Ticket' },
         },

         // Premios
         {
            path: 'premios',
            component: AwardsComponent,
            canActivate: [InicioGuard],
         },
         {
            path: 'premios/crear',
            component: CreateAwardsComponent,
            canActivate: [PermissionsGuard, InicioGuard],
            data: { Permiso_nombre: 'Crear Premio' },
         },
         {
            path: 'premios/visualizar/:id',
            component: ViewAwardsComponent,
            canActivate: [PermissionsGuard, InicioGuard],
            data: { Permiso_nombre: 'Ver Premio' },
         },
         {
            path: 'premios/editar/:id',
            component: EditAwardsComponent,
            canActivate: [PermissionsGuard, InicioGuard],
            data: { Permiso_nombre: 'Editar Premio' },
         },
         {
            path: 'probabilidades',
            component: ProbabilidadesComponent,
            canActivate: [PermissionsGuard, InicioGuard],
            data: { Permiso_nombre: 'Modificar Probabilidades del juego' },
         },

         //Premios por condicion
         {
            path: 'premios/condicion',
            component: AwardsConditionComponent,
            canActivate: [InicioGuard],
         },
         {
            path: 'premios/condicion/crear',
            component: CreateAwardsConditionComponent,
            canActivate: [PermissionsGuard, InicioGuard],
            data: { Permiso_nombre: 'Crear Condición de Premio' },
         },
         {
            path: 'premios/condicion/visualizar/:id',
            component: ViewAwardsConditionComponent,
            canActivate: [PermissionsGuard, InicioGuard],
            data: { Permiso_nombre: 'Ver Condición de Premio' },
         },
         {
            path: 'premios/condicion/editar/:id',
            component: EditAwardsConditionComponent,
            canActivate: [PermissionsGuard, InicioGuard],
            data: { Permiso_nombre: 'Editar Condición de Premio' },
         },

         //Game
         { 
            path: 'juego/resumen', component: GameSummaryComponent,
            canActivate: [InicioGuard],
         },
         { 
            path: 'juego/fecha', component: GameDateComponent,
            canActivate: [PermissionsGuard, InicioGuard],
            data: { Permiso_nombre: 'Modificar Fecha del Juego' }  
         },
         { 
            path: 'juego/seleccion', component: GameSelectionComponent,
            canActivate: [InicioGuard], 
         },
         { 
            path: 'juego/publicidad', component: PublicityComponent ,
            canActivate: [PermissionsGuard, InicioGuard],
            data: { Permiso_nombre: 'Modificar Publicidad del Juego' } 
         },
         { 
            path: 'juego/publicidad/top', component: TopPublicityComponent,
            canActivate: [PermissionsGuard, InicioGuard],
            data: { Permiso_nombre: 'Modificar Publicidad del Juego' }  
         },
         {
            path: 'juego/publicidad/bottom',
            component: BottomPublicityComponent,
            canActivate: [PermissionsGuard, InicioGuard],
            data: { Permiso_nombre: 'Modificar Publicidad del Juego' } 
         },
         { 
            path: 'juego/salvapantallas', component: SaveScreenComponent,
            canActivate: [PermissionsGuard, InicioGuard],
            data: { Permiso_nombre: 'Modificar Salvapantallas del Juego' }  
         },
         { 
            path: 'juego/scan', component: ScanCodeComponent ,
            canActivate: [PermissionsGuard, InicioGuard],
            data: { Permiso_nombre: 'Modificar Presentación de Escaneo del Juego' } 
         },
         { 
            path: 'juego/diseno', component: DesignComponent,
            canActivate: [PermissionsGuard, InicioGuard],
            data: { Permiso_nombre: 'Modificar Diseño del Juego' } 
         },
         { 
            path: 'juego/diseno/ganador', component: WinnerDesignComponent,
            canActivate: [PermissionsGuard, InicioGuard],
            data: { Permiso_nombre: 'Modificar Presentación de Ganadores del Juego' }  
         },
         { 
            path: 'juego/diseno/publicity', component: PublicityGameComponent,
            canActivate: [PermissionsGuard, InicioGuard],
            data: { Permiso_nombre: 'Modificar Diseño del Juego' }  
         },
      ],
   },
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
})
export class DashboardRoutingModule {}
