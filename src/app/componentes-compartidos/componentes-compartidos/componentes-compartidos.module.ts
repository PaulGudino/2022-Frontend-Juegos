import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SharedModule } from 'src/app/componentes/shared/shared.module';
import { ButtonPrimaryComponent } from './button-primary/button-primary.component';



@NgModule({
  declarations: [
    LoadingComponent,
    ConfirmDialogComponent,
    ButtonPrimaryComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    LoadingComponent,
    ConfirmDialogComponent,
    ButtonPrimaryComponent,
  ]
})
export class ComponentesCompartidosModule { }
