import { LoadingInterceptor } from './interceptores/spinner.interceptor';
import { SharedModule } from './componentes/shared/shared.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptores/auth.interceptor';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


import { LoginComponent } from './componentes/login/login.component';
import { RecuperarComponent } from './componentes/login/recuperar/recuperar.component';
import { ResetComponent } from './componentes/login/reset/reset/reset.component';
import { ComponentesCompartidosModule } from './componentes-compartidos/componentes-compartidos/componentes-compartidos.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecuperarComponent,
    ResetComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ComponentesCompartidosModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
