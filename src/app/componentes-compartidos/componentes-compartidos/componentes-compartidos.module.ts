import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { SharedModule } from 'src/app/componentes/shared/shared.module';



@NgModule({
  declarations: [
    LoadingComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    LoadingComponent,
    ConfirmDialogComponent,
  ]
})
export class ComponentesCompartidosModule { }
