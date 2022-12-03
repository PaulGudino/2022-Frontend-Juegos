import { SharedModule } from './../shared/shared.module';
import { ComponentesCompartidosModule } from 'src/app/componentes-compartidos/componentes-compartidos/componentes-compartidos.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { MenuComponent } from './menu/menu.component';
import { UsuariosComponent } from './user/user.component';
import { CrearUsuariosComponent } from './user/create-user/create-user.component';
import { EditarUsuariosComponent } from './user/edit-user/edit-user.component';
import { VisualizarUsuariosComponent } from './user/view-user/view-user.component';
import { MensajesErrorComponent } from './mensajes-error/mensajes-error.component';
import { RolesComponent } from './roles/roles.component';
import { RolesCrearComponent } from './roles/roles-crear/roles-crear.component';
import { RolesEditarComponent } from './roles/roles-editar/roles-editar.component';
import { PermisosRolesComponent } from './permisos/permisos-roles/permisos-roles.component';
import { CambiarContraseniaComponent } from './inicio/cambiar-Contrasenia/cambiar-contrasenia/cambiar-contrasenia.component';
import { ClientsComponent } from './clients/clients.component';
import { AwardsComponent } from './awards/awards.component';
import { CreateClientComponent } from './clients/create-client/create-client.component';
import { ViewAwardsComponent } from './awards/view-awards/view-awards.component';
import { CreateAwardsComponent } from './awards/create-awards/create-awards.component';
import { EditAwardsComponent } from './awards/edit-awards/edit-awards.component';
import { ProbabilidadesComponent } from './probabilidades/probabilidades.component';
import { CategorieComponent } from './probabilidades/categorie/categorie.component';
import { ModalComponent } from './probabilidades/modal/modal.component';
import { EditClientComponent } from './clients/edit-client/edit-client.component';
import { ViewClientComponent } from './clients/view-client/view-client.component';
import { ModalItemComponent } from './probabilidades/modal-item/modal-item.component';
import { CategorySetSquareItemComponent } from './probabilidades/category-set-square-item/category-set-square-item.component';
import { GameDateComponent } from './game-date/game-date.component';
import { CalendarPickerComponent } from './game-date/calendar-picker/calendar-picker.component';
import { CreateTicketComponent } from './tickets/create-ticket/create-ticket.component';
import { TicketsComponent } from './tickets/tickets.component';
import { EditTicketComponent } from './tickets/edit-ticket/edit-ticket.component';
import { ViewTicketComponent } from './tickets/view-ticket/view-ticket.component';
import { GameSelectionComponent } from './game-selection/game-selection.component';
import { AwardsConditionComponent } from './awards-condition/awards-condition.component';
import { CreateAwardsConditionComponent } from './awards-condition/create-awards-condition/create-awards-condition.component';
import { PublicityComponent } from './publicity/publicity.component';
import { AddPublicityComponent } from './publicity/add-publicity/add-publicity.component';
import { BannerPublicityComponent } from './publicity/banner-publicity/banner-publicity.component';
import { EditAwardsConditionComponent } from './awards-condition/edit-awards-condition/edit-awards-condition.component';
import { ViewAwardsConditionComponent } from './awards-condition/view-awards-condition/view-awards-condition.component';
import { SaveScreenComponent } from './save-screen/save-screen.component';
import { ScanCodeComponent } from './scan-code/scan-code.component';
import { DesignComponent } from './design/design.component';
import { WinnerDesignComponent } from './winner-design/winner-design.component';
import { CreateGameDateComponent } from './game-date/create-game-date/create-game-date.component';
import { PublicityGameComponent } from './publicity-game/publicity-game.component';
import { TopPublicityComponent } from './publicity/top-publicity/top-publicity.component';
import { BottomPublicityComponent } from './publicity/bottom-publicity/bottom-publicity.component';
import { BoxComponent } from './publicity-game/box/box.component';

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
      AwardsComponent,
      // Client Components
      ClientsComponent,
      CreateClientComponent,
      EditClientComponent,
      ViewClientComponent,
      // Ticket Components
      TicketsComponent,
      CreateTicketComponent,
      EditTicketComponent,
      ViewTicketComponent,
      // Awards Components
      ViewAwardsComponent,
      CreateAwardsComponent,
      EditAwardsComponent,
      ProbabilidadesComponent,
      CategorieComponent,
      ModalComponent,
      ModalItemComponent,
      CategorySetSquareItemComponent,
      // Game Component
      GameDateComponent,
      GameSelectionComponent,
      CalendarPickerComponent,
      AwardsConditionComponent,
      CreateAwardsConditionComponent,
      PublicityComponent,
      AddPublicityComponent,
      BannerPublicityComponent,
      EditAwardsConditionComponent,
      ViewAwardsConditionComponent,
      SaveScreenComponent,
      ScanCodeComponent,
      DesignComponent,
      WinnerDesignComponent,
      CreateGameDateComponent,
      PublicityGameComponent,
      TopPublicityComponent,
      BottomPublicityComponent,
      BoxComponent,
   ],
   imports: [
      SharedModule,
      CommonModule,
      DashboardRoutingModule,
      ComponentesCompartidosModule,
   ],
})
export class DashboardModule {}
