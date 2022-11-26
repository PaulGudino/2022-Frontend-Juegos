import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegoRoutingModule } from './juego-routing.module';
import { JuegoComponent } from './juego.component';
import {SharedModule} from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
//components
import { GenericButtonComponent } from './generic-button/generic-button.component';
import { KeyboardComponent } from './keyboard/keyboard.component';
import { ScanViewComponent } from './pages/scan-view/scan-view.component';
import { PublicityComponent } from './publicity/publicity.component';
import { PlayViewComponent } from './pages/play-view/play-view.component';
import { LogoComponent } from './logo/logo.component';

@NgModule({
  declarations: [
    JuegoComponent,
    GenericButtonComponent,
    KeyboardComponent,
    ScanViewComponent,
    PublicityComponent,
    PlayViewComponent,
    LogoComponent,
  ],
  imports: [
    CommonModule,
    JuegoRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
  ]
})
export class JuegoModule { }
