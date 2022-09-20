import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RolesCrear } from 'src/app/interfaces/roles/rolescrear';
import { PuenteDatosService } from '../comunicacio_componentes/puente-datos.service';
import { Roles } from 'src/app/interfaces/roles/roles';

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
  getRolbyId(id: number):Observable<Roles>{
    return this.http.get<Roles>(this.url+'api/rol/'+id+'/');
  }
  putRol(id: number, rol: Roles){
    return this.http.put(this.url+'api/rol/'+id+'/', rol);
  }
  deleteRol(id: number){
    return this.http.delete(this.url+'api/rol/'+id+'/');
  }
}
