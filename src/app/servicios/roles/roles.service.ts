import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RolesCrear } from 'src/app/interfaces/roles/rolescrear';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    private http: HttpClient,
    private puente: PuenteDatosService
  ) { }

  url = this.puente.geturl();

  postRoles(rol: RolesCrear){
    return this.http.post(this.url+'api/rol/', rol);
  }
}
