import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SharedModule } from 'src/app/componentes/shared/shared.module';
import { ButtonPrimaryComponent } from './button-primary/button-primary.component';
import { ButtonGameComponent } from './button-game/button-game/button-game.component';
import { LogoComponent } from './logo/logo.component';



@NgModule({
  declarations: [
    LoadingComponent,
    ConfirmDialogComponent,
    ButtonPrimaryComponent,
    ButtonGameComponent,
    LogoComponent
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
    LogoComponent
  ]
})
export class ComponentesCompartidosModule { }
