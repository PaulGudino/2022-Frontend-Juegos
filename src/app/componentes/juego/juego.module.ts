import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegoRoutingModule } from './juego-routing.module';
import { JuegoComponent } from './juego.component';
import {SharedModule} from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
//components
import { GenericButtonComponent } from './generic-button/generic-button.component';
import { KeyboardComponent } from './keyboard/keyboard.component';

@NgModule({
  declarations: [
    JuegoComponent,
    GenericButtonComponent,
    KeyboardComponent,
  ],
  imports: [
    CommonModule,
    JuegoRoutingModule,
    SharedModule,
    HttpClientModule
  ]
})
export class JuegoModule { }
