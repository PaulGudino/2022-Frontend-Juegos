import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegoRoutingModule } from './juego-routing.module';
import { JuegoComponent } from './juego.component';
import {SharedModule} from '../shared/shared.module';
import { GenericButtonComponent } from './generic-button/generic-button.component';

@NgModule({
  declarations: [
    JuegoComponent,
    GenericButtonComponent,
  ],
  imports: [
    CommonModule,
    JuegoRoutingModule,
    SharedModule
  ]
})
export class JuegoModule { }
