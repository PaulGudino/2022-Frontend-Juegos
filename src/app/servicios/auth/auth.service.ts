import { Logout } from '../../interfaces/auth/logout';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../../interfaces/auth/login';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = this.puente.geturl();
  constructor(private http: HttpClient, private puente: PuenteDatosService) { }

  Login(login: Login){
    return this.http.post(this.url+'auth/login/', login);
  }

  Logout(logout: Logout){
    return this.http.post(this.url+'auth/logout/', logout);
  }


}
