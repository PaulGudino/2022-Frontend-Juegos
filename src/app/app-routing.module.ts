import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './componentes/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', loadChildren: () => import('./componentes/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
