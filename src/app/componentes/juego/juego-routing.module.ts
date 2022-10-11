import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {JuegoComponent} from './juego.component'
import {ScanViewComponent} from './pages/scan-view/scan-view.component';
const routes: Routes = [
    {path:'',component:JuegoComponent},
    {path:'scan',component:ScanViewComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegoRoutingModule { }
