import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SharedModule } from 'src/app/componentes/shared/shared.module';
import { ButtonPrimaryComponent } from './button-primary/button-primary.component';
import { ButtonGameComponent } from './button-game/button-game/button-game.component';
import { LogoComponent } from './logo/logo.component';
import { TickectQRComponent } from './tickect-qr/tickect-qr.component';



@NgModule({
  declarations: [
    LoadingComponent,
    ConfirmDialogComponent,
    ButtonPrimaryComponent,
    ButtonGameComponent,
    LogoComponent,
    TickectQRComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    LoadingComponent,
    ConfirmDialogComponent,
    ButtonPrimaryComponent,
    ButtonGameComponent,
    LogoComponent,
    TickectQRComponent,
  ]
})
export class ComponentesCompartidosModule { }
