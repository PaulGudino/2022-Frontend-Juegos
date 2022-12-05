import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SharedModule } from 'src/app/componentes/shared/shared.module';
import { ButtonPrimaryComponent } from './button-primary/button-primary.component';
import { ButtonGameComponent } from './button-game/button-game/button-game.component';
import { LogoComponent } from './logo/logo.component';
import { InputPasswordFormComponent } from './input-password-form/input-password-form.component';
import { InputSelectFormComponent } from './input-select-form/input-select-form.component';
import { InputTendigitsFormComponent } from './input-tendigits-form/input-tendigits-form.component';
import { InputTextFormComponent } from './input-text-form/input-text-form.component';
import { InputEmailFormComponent } from './input-email-form/input-email-form.component';



@NgModule({
  declarations: [
    LoadingComponent,
    ConfirmDialogComponent,
    ButtonPrimaryComponent,
    ButtonGameComponent,
    LogoComponent,
    InputPasswordFormComponent,
    InputSelectFormComponent,
    InputTendigitsFormComponent,
    InputTextFormComponent,
    InputEmailFormComponent,
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
    InputPasswordFormComponent,
    InputSelectFormComponent,
    InputTendigitsFormComponent,
    InputTextFormComponent,
    InputEmailFormComponent,
  ]
})
export class ComponentesCompartidosModule { }
