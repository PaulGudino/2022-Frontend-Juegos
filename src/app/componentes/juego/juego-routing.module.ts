import { JuegoGuard } from './../../guardianes/Juego/juego.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {JuegoComponent} from './juego.component'
import {ScanViewComponent} from './pages/scan-view/scan-view.component';
import {PlayViewComponent} from './pages/play-view/play-view.component';
const routes: Routes = [
    {
      path:'',component:JuegoComponent,
    },
    {
      path:'scan',component:ScanViewComponent,
      canActivate: [JuegoGuard],
      data: { Validate_game: 'juego_scan' } 
    },
    {
      path:'play',component:PlayViewComponent,
      canActivate: [JuegoGuard],
      data: { Validate_game: 'juego_play' } 
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegoRoutingModule { }
